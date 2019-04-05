/**
 *  Copyright 2019 Angus.Fenying <fenying@litert.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as C from "./Common";
import * as E from "./Errors";
import * as U from "./Utils";
import {
    AbstractParser,
    Option,
    Command
} from "./AbstractParser";

const MIN_TERM_WIDTH = 80;

interface IContext {

    cursor: number;

    segments: string[];

    result: C.IResult;

    command?: {

        "info": Command;

        "result": C.ICommandResult;
    };

    path?: string;
}

class GNUParser extends AbstractParser {

    public parse(args: string[]): C.IResult {

        const ctx: IContext = {

            cursor: 0,
            segments: this._prepareArgs(args.slice()),
            result: {
                help: "",
                commands: [],
                options: {},
                unknownOptions: [],
                flags: {},
                arguments: []
            }
        };

        for (; ctx.cursor < ctx.segments.length; ctx.cursor++) {

            if (this._tryParseLongOption(ctx)) {

                continue;
            }

            if (this._tryParseShortOption(ctx)) {

                continue;
            }

            if (this._tryParseCommand(ctx)) {

                continue;
            }

            let theArg = ctx.segments[ctx.cursor];

            if (theArg === "--") {

                theArg = ctx.segments[++ctx.cursor];
            }

            if (theArg !== undefined) {

                ctx.result.arguments.push(ctx.segments[ctx.cursor]);
            }
        }

        if (this._config.help.flag && ctx.result.flags.help) {

            ctx.result.help = "true";
        }

        if (ctx.result.help) {

            ctx.result.help = ctx.path || ".";
        }
        else if (ctx.result.arguments.length < this._config.arguments.minimalInputs) {

            throw new E.E_NO_ENOUGH_ARGUMENTS();
        }
        else if (ctx.command && ctx.command.info.hasSubCommands) {

            throw new E.E_COMMAND_EXPECTED();
        }

        return ctx.result;
    }

    private _tryParseLongOption(ctx: IContext): boolean {

        const theArg = ctx.segments[ctx.cursor];

        /**
         * If it's a long-option.
         */
        if (/^--[a-z0-9A-Z]+/.test(theArg)) {

            /**
             * When `notAfterArguments` is on, treat the options/flags after
             * the first argument as arguments.
             */
            if (this._config.options.notAfterArguments && ctx.result.arguments.length) {

                ctx.result.arguments.push(theArg);

                return true;
            }

            let [optName, optValue] = this._parseOption(theArg.slice(2));

            if (optValue !== undefined && !this._config.options.long.assignArgument) {

                this._saveUnknownOptions(ctx);

                return true;
            }

            const option = this._getOptionByName(ctx, optName);

            if (!option) {

                this._saveUnknownOptions(ctx);

                return true;
            }

            if (option.isFlag()) {

                this._saveFlags(ctx, option);

                return true;
            }

            if (optValue) {

                this._saveOptions(ctx, option, optValue);

                return true;
            }

            /**
             * E.g. `--abc arg`.
             */
            if (this._config.options.long.followArgument) {

                this._saveOptions(
                    ctx,
                    option,
                    this._readNextAsArgument(ctx, optName)
                );

                return true;
            }
            else {

                throw new E.E_EXPECT_OPTION_ARGUMENT({
                    "metadata": { "option": option.name }
                });
            }
        }

        return false;
    }

    private _tryParseShortOption(ctx: IContext): boolean {

        const theArg = ctx.segments[ctx.cursor];

        /**
         * If it's a short-option.
         */
        if (/^-[a-zA-Z0-9]+/.test(theArg)) {

            let [optName, optValue] = U.strSplit(theArg.slice(1), "=", 2);

            /**
             * When mix-flags is off, the mixed flags shold be treat as unknown
             * flags/options.
             */
            const forceUnknown = optName.length > 1 && !this._config.options.shortcut.mix;

            const shortcuts = [...this._prepareOptionShortcut(optName, false)];

            for (let j = 0; j < shortcuts.length; j++) {

                const shortcut = shortcuts[j];
                const scInfo = this._getOptionByShortuct(ctx, shortcut);

                /**
                 * If no such an option.
                 */
                if (forceUnknown || !scInfo) {

                    this._saveUnknownOptions(
                        ctx,
                        shortcuts.length === 1 ?
                            theArg : j === shortcuts.length - 1 ?
                                `-${theArg.slice(j + 1)}` :
                                `-${shortcut}`
                    );

                    continue;
                }

                if (scInfo.isFlag()) {

                    this._saveFlags(ctx, scInfo);
                    continue;
                }

                /**
                 * If an options is not at the ending of mix-expression.
                 *
                 * E.g. `-abcd`, where the b is the current shorcut.
                 */
                if (j !== shortcuts.length - 1) {

                    /**
                     * If attach-mode is off.
                     */
                    if (!this._config.options.shortcut.attachArgument) {

                        this._saveUnknownOptions(
                            ctx,
                            `-${shortcut}`
                        );

                        continue;
                    }

                    optValue = theArg.slice(j + 2);

                    this._saveOptions(
                        ctx,
                        scInfo,
                        optValue
                    );

                    j = shortcuts.length;
                }
                else if (optValue !== undefined) {

                    if (!this._config.options.shortcut.assignArgument) {

                        this._saveUnknownOptions(
                            ctx,
                            `-${shortcut}=${optValue}`
                        );

                        return true;
                    }

                    this._saveOptions(
                        ctx,
                        scInfo,
                        optValue
                    );
                }
                else if (this._config.options.shortcut.followArgument) {

                    this._saveOptions(
                        ctx,
                        scInfo,
                        this._readNextAsArgument(ctx, scInfo.name)
                    );
                }
                else {

                    throw new E.E_EXPECT_OPTION_ARGUMENT({
                        "metadata": { "option": scInfo.name }
                    });
                }
            }

            return true;
        }

        return false;
    }

    private _tryParseCommand(ctx: IContext): boolean {

        let info: Command;

        let theSeg = this._prepareCommandName(ctx.segments[ctx.cursor], false);

        /**
         * If no commands supported.
         */
        if (!Object.keys(this._cmds).length) {

            return false;
        }

        if (ctx.command) {

            /**
             * If the current command has no sub-commands.
             */
            if (!Object.keys(ctx.command.info.subCommands).length) {

                return false;
            }

            info = ctx.command.info.subCommands[theSeg];
        }
        else {

            if (
                this._config.help.delegated &&
                this._config.help.command &&
                theSeg.toLowerCase() === "help"
            ) {

                ctx.result.help = ".";

                return true;
            }

            info = this._cmds[theSeg];
        }

        /**
         * If not found by full command name, try again with the aliases.
         */
        if (!info) {

            theSeg = this._prepareCommandAlias(ctx.segments[ctx.cursor], false);

            info = ctx.command ?
                ctx.command.info.subCommandAliases[theSeg] :
                this._cmdAliases[theSeg];

            if (!info) {

                throw new E.E_UNKNOWN_COMMAND({
                    "metadata": { "command": theSeg }
                });
            }
        }

        const result: C.ICommandResult = {
            options: {},
            flags: {},
            name: info.name,
            id: info.id
        };

        ctx.result.commands.push(result);

        ctx.path = ctx.result.commands.map((x) => x.name).join(".");

        ctx.command = {

            result,
            info
        };

        return true;
    }

    private _readNextAsArgument(ctx: IContext, optionName: string): string {

        let ret = ctx.segments[++ctx.cursor];

        if (ret === "--") {

            ret = ctx.segments[++ctx.cursor];
        }

        /**
         * Reached the ending.
         */
        if (ret === undefined) {

            throw new E.E_EXPECT_OPTION_ARGUMENT({
                "metadata": { optionName }
            });
        }

        return ret;
    }

    private _parseOption(expr: string): [string, string?] {

        return U.strSplit(expr, "=", 2) as [string, string?];
    }

    private _getOptionByName(ctx: IContext, name: string): Option {

        name = this._prepareOptionName(name, false);

        if (ctx.command) {

            return ctx.command.info.getOptionByName(name) ||
                    this._options[name];
        }

        return this._options[name];
    }

    private _getOptionByShortuct(ctx: IContext, shortcut: string): null | Option {

        shortcut = this._prepareOptionShortcut(shortcut, false);

        if (ctx.command) {

            return ctx.command.info.getOptionByShortcut(shortcut) ||
                    this._optionShortcuts[shortcut];
        }

        return this._optionShortcuts[shortcut];
    }

    private _saveUnknownOptions(
        ctx: IContext,
        expr?: string
    ): void {

        expr = expr || ctx.segments[ctx.cursor];

        if (this._config.options.unknownAsArguments) {

            ctx.result.arguments.push(expr);
        }
        else {

            if (!ctx.result.unknownOptions.includes(expr)) {

                ctx.result.unknownOptions.push(expr);
            }
        }
    }

    private _saveOptions(
        ctx: IContext,
        option: Option,
        optionValue: string
    ): void {

        let optionResult: Record<string, string[]>;

        /**
         * When command-mode, check if it's a command-limited flag.
         */
        if (option.parent) {

            optionResult = (ctx.result.commands.find(
                (x) => x.id === (option.parent as Command).id
            ) as C.ICommandResult).options;
        }
        else {

            optionResult = ctx.result.options;
        }

        if (!optionResult[option.name]) {

            optionResult[option.name] = [];
        }

        optionResult[option.name].push(optionValue);

        if (
            option.args !== -1 &&
            optionResult[option.name].length > option.args
        ) {

            throw new E.E_TOO_MANY_ARGUMENTS({
                "metadata": { "optionName": option.name }
            });
        }
    }

    private _saveFlags(
        ctx: IContext,
        flag: Option
    ): void {

        /**
         * When command-mode, check if it's a command-limited flag.
         */
        if (flag.parent) {

            (ctx.result.commands.find(
                (x) => x.id === (flag.parent as Command).id
            ) as C.ICommandResult).flags[flag.name] = true;
            return;
        }

        ctx.result.flags[flag.name] = true;
    }

    private _prepareArgs(args: string[]): string[] {

        const pos = args.indexOf("--");

        if (pos !== -1) {

            args.splice(
                pos,
                -2,
                "--",
                args.splice(
                    pos, args.length - pos
                ).map(
                    (x) => `"${x}"`
                ).slice(1).join(" ")
            );
        }

        return args;
    }

    public generateHelp(
        appName: string,
        path: string,
        width: number= MIN_TERM_WIDTH
    ): string[] {

        if (width < MIN_TERM_WIDTH) {

            width = MIN_TERM_WIDTH;
        }

        return (path && path !== ".") ?
            this._generateCommandHelp(appName, path, width) :
            this._generateRootHelp(appName, width);
    }

    private _generateCommandNames(cmd: Command): string {

        if (cmd.aliases && cmd.aliases.length) {

            return [cmd.name, ...cmd.aliases].join(", ");
        }

        return cmd.name;
    }

    private _generateOptionNames(option: Option): string {

        const ARG_NAME = option.isFlag() ? "" : ` <${option.argName.toUpperCase()}>`;

        if (option.shortcut) {

            return `-${option.shortcut}, --${option.name}${ARG_NAME}`;
        }

        return U.indent(`--${option.name}${ARG_NAME}`);
    }

    private _generateCommandHelp(
        appName: string,
        path: string,
        width: number
    ): string[] {

        const cmd = this._getCommandByPath(path);

        if (!cmd) {

            throw new E.E_COMMAND_NOT_FOUND_BY_PATH({
                "metadata": { path }
            });
        }

        const output: string[] = [];

        const cmdHelpTips: string[] = [];

        const cmdExpr = path.replace(/\./g, " ");

        if (cmd.hasSubCommands) {

            output.push(...U.wrapLines(
                `Usage: ${appName} ${cmdExpr} [OPTIONS]... <COMMAND>... [ARGS]...`,
                width,
                2
            ));

            output.push("");

            output.push("Commands:");

            output.push("");

            this._genHelpList(
                output,
                Object.values(cmd.subCommands).map(
                    (o) => [
                        this._generateCommandNames(o),
                        o.description
                    ]
                ),
                width
            );

            output.push("");

            if (this._config.help.command) {

                cmdHelpTips.push(`"${appName} help ${cmdExpr} <COMMAND>"`);
            }

            output.push("");
        }
        else if (cmd.hasOptions) {

            output.push(`Usage: ${appName} ${cmdExpr} [OPTIONS]... [ARGS]...`);
        }
        else {

            output.push(`Usage: ${appName} ${cmdExpr} [ARGS]...`);
        }

        if (cmd.hasOptions) {

            output.push("");

            output.push("Options:");

            output.push("");

            this._genHelpList(
                output,
                Object.values(cmd.options).map(
                    (o) => [
                        this._generateOptionNames(o),
                        o.description
                    ]
                ),
                width
            );

            if (cmd.hasSubCommands && this._config.help.flag) {

                cmdHelpTips.push(`"${appName} ${cmdExpr} <COMMAND> --help"`);

                if (this._config.help.flagShortchut) {

                    cmdHelpTips.push(`"${appName} ${cmdExpr} <COMMAND> -h"`);
                }
            }

            output.push("");
        }

        if (cmdHelpTips.length) {

            output.push(...U.wrapLines(
                `Use ${cmdHelpTips.join(", ")} to see more details.`,
                width
            ));
        }

        return output;
    }

    private _generateRootHelp(appName: string, width: number): string[] {

        let output: string[] = [];

        let cmdHelpTips: string[] = [];

        const hasCommands = !!Object.keys(this._cmds).length;

        if (hasCommands) {

            output.push(`Usage: ${appName} [OPTIONS]... <COMMAND>... [ARGS]...`);

            output.push("");

            output.push("Commands:");

            output.push("");

            this._genHelpList(
                output,
                Object.values(this._cmds).map(
                    (o) => [
                        this._generateCommandNames(o),
                        o.description
                    ]
                ),
                width
            );

            output.push("");

            if (this._config.help.command) {

                cmdHelpTips.push(`"${appName} help <COMMAND>"`);
            }

            output.push("");
        }
        else if (!Object.keys(this._options).length) {

            output.push(`Usage: ${appName} [ARGS]...`);
        }
        else {

            output.push(`Usage: ${appName} [OPTIONS]... [ARGS]...`);
        }

        if (Object.keys(this._options).length) {

            output.push("");

            output.push("Options:");

            output.push("");

            this._genHelpList(
                output,
                Object.values(this._options).map(
                    (o) => [
                        this._generateOptionNames(o),
                        o.description
                    ]
                ),
                width
            );

            if (hasCommands && this._config.help.flag) {

                cmdHelpTips.push(`"${appName} <COMMAND> --help"`);

                if (this._config.help.flagShortchut) {

                    cmdHelpTips.push(`"${appName} <COMMAND> -h"`);
                }
            }

            output.push("");
        }

        if (cmdHelpTips.length) {

            output.push(...U.wrapLines(
                `Use ${cmdHelpTips.join(", ")} to see more details.`,
                width
            ));
        }

        return output;
    }

    private _genHelpList(
        output: string[],
        items: string[][],
        width: number
    ): void {

        const LEFT_COL_TABS = Math.ceil(width / 16);
        const LEFT_COL_WIDTH = LEFT_COL_TABS * 4;
        const LEFT_COL_CONTENT_LENGTH = LEFT_COL_WIDTH - 6;

        for (const row of items) {

            const descr = U.wrapLines(
                row[1],
                width - LEFT_COL_WIDTH
            );

            // <len> + 4-spaces + 2-spaces
            if (row[0].length > LEFT_COL_CONTENT_LENGTH) {

                output.push(
                    U.indent(row[0]),
                    ...descr.map((x) => U.indent(x, LEFT_COL_TABS))
                );
            }
            else {

                output.push(
                    U.indent(row[0]).padEnd(LEFT_COL_WIDTH, " ") + descr[0],
                    ...descr.slice(1).map((x) => U.indent(x, LEFT_COL_TABS))
                );
            }
        }
    }
}

const DEFAULT_CONFIG: C.IParserConfig = {
    "help": {
        "delegated": true,
        "flag": true,
        "flagShortchut": true,
        "command": true
    },
    "arguments": {

        "minimalInputs": 0
    },
    "commands": {

        "aliasCaseSensitive": false,
        "caseSensitive": false
    },
    "options": {
        "notAfterArguments": false,
        "unknownAsArguments": false,
        "shortcut": {
            "caseSensitive": true,
            "attachArgument": true,
            "assignArgument": true,
            "followArgument": true,
            "mix": true
        },
        "long": {

            "caseSensitive": true,
            "assignArgument": true,
            "followArgument": true,
        }
    }
};

export function createGNUParser(config?: C.DeepPartial<C.IParserConfig>): C.IParser {

    return new GNUParser(U.deepDefault(config || {}, DEFAULT_CONFIG));
}
