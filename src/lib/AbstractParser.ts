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

export class Option {

    public constructor(

        public name: string,

        public description: string,

        public shortcut?: string,

        public args: number = -1,

        public path?: string,

        public parent?: Command,

        public argName: string = "VALUE"
    ) {

    }

    public isFlag(): boolean {

        return this.args === 0;
    }

    public static isValidName(name: string): boolean {

        return /^[a-z0-9][-a-z0-9]+$/i.test(name);
    }

    public static isValidShortcut(shortcut: string): boolean {

        return /^[a-z0-9]$/i.test(shortcut);
    }

}

export class Command {

    protected static __idCounter: number = 0;

    public subCommands: Record<string, Command>;

    public subCommandAliases: Record<string, Command>;

    public options: Record<string, Option>;

    public optionShortcuts: Record<string, Option>;

    public readonly id = Command.__idCounter++;

    public constructor(

        public name: string,

        public description: string,

        public aliases?: string[],

        public parent?: Command
    ) {

        this.subCommands = {};
        this.subCommandAliases = {};
        this.options = {};
        this.optionShortcuts = {};
    }

    public getOptionByName(name: string): Option | null {

        if (this.options[name]) {

            return this.options[name];
        }

        if (this.parent) {

            return this.parent.getOptionByName(name);
        }

        return null;
    }

    public get hasSubCommands(): boolean {

        return !!Object.keys(this.subCommands).length;
    }

    public get hasOptions(): boolean {

        return !!Object.keys(this.options).length;
    }

    public getOptionByShortcut(shortcut: string): Option | null {

        if (this.optionShortcuts[shortcut]) {

            return this.optionShortcuts[shortcut];
        }

        if (this.parent) {

            return this.parent.getOptionByShortcut(shortcut);
        }

        return null;
    }

    public static isValidName(name: string): boolean {

        return /^[a-z0-9][-a-z0-9]*$/i.test(name);
    }

    public static isValidPath(path: string): boolean {

        return /^[a-z0-9][-a-z0-9]*(\.[a-z0-9][-a-z0-9]*)*$/i.test(path);
    }
}

export abstract class AbstractParser implements C.IParser {

    protected _cmds: Record<string, Command>;

    protected _cmdAliases: Record<string, Command>;

    protected _options: Record<string, Option>;

    protected _optionShortcuts: Record<string, Option>;

    public constructor(
        protected _config: C.IParserConfig
    ) {

        this._cmds = {};
        this._cmdAliases = {};
        this._options = {};
        this._optionShortcuts = {};

        if (this._config.help.delegated) {

            if (
                !this._config.help.flag &&
                !this._config.help.command
            ) {

                throw new E.E_CONFLICT_CONFIG({
                    "message": "Must enable at least one of help-command or help-flag."
                });
            }
        }

        if (this._config.help.delegated && this._config.help.flag) {

            this.addOption({
                "name": "help",
                "description": "Display the help information.",
                "shortcut": this._config.help.flagShortchut ? "h" : undefined,
                "arguments": 0
            });
        }

        if (
            !this._config.options.long.followArgument &&
            !this._config.options.long.assignArgument
        ) {

            throw new E.E_CONFLICT_CONFIG({
                "message": "Must enable at least one of follow-mode or assign-mode."
            });
        }

        if (
            !this._config.options.shortcut.followArgument &&
            !this._config.options.shortcut.assignArgument &&
            !this._config.options.shortcut.attachArgument
        ) {

            throw new E.E_CONFLICT_CONFIG({
                "message": "Must enable at least one of follow-mode, attach-mode or assign-mode."
            });
        }
    }

    public addCommand(settings: C.ICommandSettings): this {

        const cmdName = this._prepareCommandName(settings.name);

        const aliases = settings.aliases ? (
            Array.isArray(settings.aliases) ?
            settings.aliases : [settings.aliases]
        ).map((x) => this._prepareCommandAlias(x)) : [];

        if (settings.path) {

            const cmd = this._getCommandByPath(settings.path);

            if (!cmd) {

                throw new E.E_COMMAND_NOT_FOUND_BY_PATH({
                    "metadata": { settings }
                });
            }

            if (cmd.subCommands[cmdName] || cmd.subCommandAliases[cmdName]) {

                throw new E.E_DUP_COMMAND_NAME({
                    "metadata": { settings }
                });
            }

            for (const alias of aliases) {

                if (cmd.subCommands[alias] || cmd.subCommandAliases[alias]) {

                    throw new E.E_DUP_COMMAND_ALIAS({
                        "metadata": { settings, alias }
                    });
                }
            }

            cmd.subCommands[cmdName] = new Command(
                cmdName,
                settings.description,
                aliases.length ? aliases : undefined,
                cmd
            );

            for (const alias of aliases) {

                cmd.subCommandAliases[alias] = cmd.subCommands[cmdName];
            }
        }
        else {

            if (this._cmds[cmdName] || this._cmdAliases[cmdName]) {

                throw new E.E_DUP_COMMAND_NAME({
                    "metadata": { settings }
                });
            }

            for (const alias of aliases) {

                if (this._cmds[alias] || this._cmdAliases[alias]) {

                    throw new E.E_DUP_COMMAND_ALIAS({
                        "metadata": { settings, alias }
                    });
                }
            }

            this._cmds[cmdName] = new Command(
                cmdName,
                settings.description,
                aliases.length ? aliases : undefined
            );

            for (const alias of aliases) {

                this._cmdAliases[alias] = this._cmds[cmdName];
            }
        }

        return this;
    }

    public addOption(settings: C.IOptionSettings): this {

        const optName = this._prepareOptionName(settings.name);

        const optShortcut = settings.shortcut ?
                        this._prepareOptionShortcut(settings.shortcut) :
                        undefined;

        if (settings.path) {

            if (!Array.isArray(settings.path)) {

                settings.path = [settings.path];
            }

            for (let path of settings.path) {

                this._addOptionByPath(
                    settings,
                    path,
                    optName,
                    optShortcut,
                    settings.argumentName
                );
            }
        }
        else {

            this._addOption(
                settings,
                optName,
                optShortcut,
                settings.argumentName
            );
        }

        return this;
    }

    protected _addOptionByPath(
        settings: C.IOptionSettings,
        path: string,
        optName: string,
        optShortcut: string | undefined,
        argName?: string
    ): void {

        const cmd = this._getCommandByPath(path);

        if (!cmd) {

            throw new E.E_COMMAND_NOT_FOUND_BY_PATH({
                "metadata": { settings }
            });
        }

        if (cmd.options[optName]) {

            throw new E.E_DUP_OPTION_NAME({
                "metadata": { settings, path }
            });
        }

        if (optShortcut && cmd.optionShortcuts[optShortcut]) {

            throw new E.E_DUP_OPTION_SHORTCUT({
                "metadata": { settings, path }
            });
        }

        cmd.options[optName] = new Option(
            optName,
            settings.description,
            optShortcut,
            settings.arguments,
            path,
            cmd,
            argName
        );

        if (optShortcut) {

            cmd.optionShortcuts[optShortcut] = cmd.options[optName];
        }
    }

    protected _addOption(
        settings: C.IOptionSettings,
        optName: string,
        optShortcut: string | undefined,
        argName?: string
    ): void {

        if (this._options[optName]) {

            throw new E.E_DUP_OPTION_NAME({
                "metadata": { settings }
            });
        }

        if (optShortcut && this._optionShortcuts[optShortcut]) {

            throw new E.E_DUP_OPTION_SHORTCUT({
                "metadata": { settings }
            });
        }

        this._options[optName] = new Option(
            optName,
            settings.description,
            optShortcut,
            settings.arguments,
            undefined,
            undefined,
            argName
        );

        if (optShortcut) {

            this._optionShortcuts[optShortcut] = this._options[optName];
        }
    }

    protected _prepareCommandName(name: string, assert: boolean = true): string {

        const ret = this._config.commands.caseSensitive ? name : name.toLowerCase();

        if (assert && !Command.isValidName(name)) {

            throw new E.E_INVALID_COMMAND_NAME({
                "metadata": { name }
            });
        }

        return ret;
    }

    protected _prepareCommandAlias(alias: string, assert: boolean = true): string {

        const ret = this._config.commands.aliasCaseSensitive ? alias : alias.toLowerCase();

        if (assert && !Command.isValidName(alias)) {

            throw new E.E_INVALID_COMMAND_ALIAS({
                "metadata": { alias }
            });
        }

        return ret;
    }

    protected _prepareCommandPath(path: string, assert: boolean = true): string {

        const ret = this._config.commands.caseSensitive ? path : path.toLowerCase();

        if (assert && !Command.isValidPath(path)) {

            throw new E.E_INVALID_COMMAND_PATH({
                "metadata": { path }
            });
        }

        return ret;
    }

    protected _prepareOptionName(name: string, assert: boolean = true): string {

        const ret = this._config.options.long.caseSensitive ? name : name.toLowerCase();

        if (assert && !Option.isValidName(name)) {

            throw new E.E_INVALID_OPTION_NAME({
                "metadata": { name }
            });
        }

        return ret;
    }

    protected _prepareOptionShortcut(shortcut: string, assert: boolean = true): string {

        const ret = this._config.options.shortcut.caseSensitive ? shortcut : shortcut.toLowerCase();

        if (assert && !Option.isValidShortcut(shortcut)) {

            throw new E.E_INVALID_OPTION_SHORTCUT({
                "metadata": { shortcut }
            });
        }

        return ret;
    }

    protected _getCommandByPath(path: string): Command | null {

        path = this._prepareCommandPath(path);

        try {

            const cmds = path.split(".");

            const mainCmd = cmds.splice(0, 1)[0];

            return cmds.reduce(
                (p, k) => p.subCommands[k],
                this._cmds[mainCmd]
            );
        }
        catch (e) {

            return null;
        }
    }

    public abstract parse(args: string[]): C.IResult;

    public abstract generateHelp(
        appName: string,
        path: string,
        width?: number
    ): string[];
}
