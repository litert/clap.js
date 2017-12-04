/*
   +----------------------------------------------------------------------+
   | LiteRT Clap.js Library                                               |
   +----------------------------------------------------------------------+
   | Copyright (c) 2007-2017 Fenying Studio                               |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/clap.js/blob/master/LICENSE                |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <i.am.x.fenying@gmail.com>                    |
   +----------------------------------------------------------------------+
 */

import { IDictionary } from "@litert/core";
import Exception from "./class.Exception";
import * as Errors from "./errors";
import { ParseResult } from "./class.ParseResult";
import * as Internal from "./internal";
import * as External from "./interfaces";
import Option = require("./class.Option");

const DEFAULT_PARSER_OPTIONS: External.IParserSettings = {
    "follow": true,
    "fullAssign": false,
    "shortAssign": false,
    "shortAttach": false
};

export class SimpleParser implements External.ISimpleParser {

    protected _options: IDictionary<Internal.IOption>;

    protected _shortOptions: IDictionary<Internal.IOption>;

    protected _settings: External.IParserSettings;

    public constructor(opts?: External.IParserSettings) {

        this._options = {};

        this._shortOptions = {};

        this._settings = {};

        if (!opts) {

            opts = {};
        }

        let optss = <IDictionary<boolean>> opts;

        let mySettings = <IDictionary<boolean>> this._settings;

        let defValues = <IDictionary<boolean>> DEFAULT_PARSER_OPTIONS;

        for (let key in <IDictionary<boolean>> DEFAULT_PARSER_OPTIONS) {

            mySettings[key] = optss[key] === undefined ?
                defValues[key] :
                optss[key];
        }
    }

    public addOption(opts: External.IOptionSetting): SimpleParser {

        opts.name = opts.name.toLowerCase();

        if (this._options[opts.name]) {

            throw new Exception(
                Errors.E_DUPLICATED_OPTION_NAME,
                `Option "--${opts.name}" already exists.`
            );
        }

        this._options[opts.name] = new Option(opts);

        if (opts.shortcut) {

            if (this._shortOptions[opts.shortcut]) {

                throw new Exception(
                    Errors.E_DUPLICATED_OPTION_SHORTCUT,
                    `Option shortcut "-${opts.shortcut}" already exists.`
                );
            }

            this._shortOptions[opts.shortcut] = this._options[opts.name];
        }

        return this;
    }

    public parse(cmdArgs: string[]): External.IParseResult {

        let cursor: number = 0;

        let ret: Internal.IParseResult = new ParseResult();

        try {

            while (cursor < cmdArgs.length) {

                cursor += this._parseLoop(
                    cmdArgs,
                    cursor,
                    ret
                );
            }

            ret.setSuccess();
        }
        catch (e) {

            ret.setFailure(e);
        }

        return ret;
    }

    protected _parseLoop(
        cmdArgs: string[],
        cursor: number,
        result: Internal.IParseResult
    ): number {

        let piece = cmdArgs[cursor];

        if (piece[0] !== "-") {

            result.addArgument(piece);

            return 1;
        }

        return this._onHandlingOption(
            cmdArgs,
            cursor,
            result
        );
    }

    protected _onHandlingOption(
        cmdArgs: string[],
        cursor: number,
        result: Internal.IParseResult
    ): number {

        let piece = cmdArgs[cursor];

        let option: Internal.IOption;

        piece = piece.trim();

        if (this._settings.shortAssign && /^-[A-Za-z]\=.*$/.test(piece)) {

            // short-assign pattern

            return this._onShortAssignOption(
                cmdArgs,
                cursor,
                result
            );
        }
        else if (this._settings.shortAttach && /^-[a-zA-Z]/.test(piece)) {

            option = this._shortOptions[piece[1]];

            if (option && option.withArgument) {

                // short-attach pattern
                return this._onShortAttachOption(
                    option,
                    piece,
                    result
                );
            }
        }

        if (/^-[a-zA-Z]+$/.test(piece)) {

            option = this._shortOptions[piece[1]];

            if (piece.length === 2) {

                // short-alone pattern

                return this._onShortAloneOption(
                    cmdArgs,
                    cursor,
                    option,
                    result
                );
            }

            // compact-like pattern

            if (!option || option.isFlag()) {

                // short-compact pattern
                return this._onShortCompactedOption(
                    piece,
                    result
                );
            }
        }
        else if (/^--[-A-Z0-9a-z]+\=.*$/.test(piece)) {

            // full-assign pattern

            return this._onFullAssignOption(
                cmdArgs,
                cursor,
                result
            );
        }
        else if (/^--[-A-Z0-9a-z]+$/.test(piece)) {

            // full-alone pattern

            option = this._options[piece.slice(2)];

            return this._onFullAloneOption(
                cmdArgs,
                cursor,
                option,
                result
            );
        }

        result.addArgument(piece);

        return 1;
    }

    /**
     * Pattern: -h -v -i a.ts -o a.js ...
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param option  The option
     * @param result  The result object
     */
    protected _onShortAloneOption(
        cmdArgs: string[],
        cursor: number,
        option: Internal.IOption,
        result: Internal.IParseResult
    ): number {

        if (option) {

            return this._onAloneOption(
                cmdArgs,
                cursor,
                option,
                result
            );
        }

        result.addUnknownOption(cmdArgs[cursor]);
        return 1;
    }

    /**
     * Pattern: -ia.ts -oa.js -O3
     *
     * @param option  The option descriptor object
     * @param piece   The current piece of arguments
     * @param result  The result object
     */
    protected _onShortAttachOption(
        option: Internal.IOption,
        piece: string,
        result: Internal.IParseResult
    ): number {

        let arg = piece.slice(2);

        if (arg.length === 0) {

            if (option.defaultArgument === undefined) {

                throw new Exception(
                    Errors.E_LACK_OPTION_ARG,
                    `Option "${piece}" requires an argument.`
                );
            }

            arg = option.defaultArgument;
        }

        if (option.repeatable) {

            result.addOption(
                option.name,
                arg
            );
        }
        else {

            result.setOption(
                option.name,
                arg
            );
        }

        return 1;
    }

    /**
     * Pattern: -zxvf
     *
     * @param piece   The current piece of arguments
     * @param result  The result object
     */
    protected _onShortCompactedOption(
        piece: string,
        result: Internal.IParseResult
    ): number {

        for (let shortName of piece.slice(1).split("")) {

            let option = this._shortOptions[shortName];

            if (option === undefined) {

                result.addUnknownOption(`-${shortName}`);
                continue;
            }

            if (!option.isFlag()) {

                throw new Exception(
                    Errors.E_FORBIDDEN_COMPACT,
                    `Option "-${shortName}" is not a flag option, cannot be compacted.`
                );
            }

            result.setFlagOption(
                option.name
            );
        }

        return 1;
    }

    /**
     * Pattern: -i=a.ts -o=a.ts
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param result  The result object
     */
    protected _onShortAssignOption(
        cmdArgs: string[],
        cursor: number,
        result: Internal.IParseResult
    ): number {

        let piece = cmdArgs[cursor];

        let option = this._shortOptions[piece[1]];

        if (!option) {

            result.addUnknownOption(`-${piece[1]}`);
            return 1;
        }

        if (option.isInput()) {

            let arg = piece.slice(3);

            if (arg.length === 0) {

                if (option.defaultArgument === undefined) {

                    throw new Exception(
                        Errors.E_LACK_OPTION_ARG,
                        `Option "-${option.shortcut}" requires an argument.`
                    );
                }

                arg = option.defaultArgument;
            }

            if (option.repeatable) {

                result.addOption(
                    option.name,
                    arg
                );
            }
            else {

                result.setOption(
                    option.name,
                    arg
                );
            }

            return 1;
        }

        throw new Exception(
            Errors.E_ASSIGN_TO_FLAG,
            `Cannot assign a value to flag option "-${option.shortcut}".`
        );
    }

    /**
     * Pattern: --input=a.ts --output=a.ts
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param result  The result object
     */
    protected _onFullAssignOption(
        cmdArgs: string[],
        cursor: number,
        result: Internal.IParseResult
    ): number {

        if (!this._settings.fullAssign) {

            throw new Exception(
                Errors.E_FORBIDDEN_ASSIGN,
                `Assign mode is not allow.`
            );
        }

        let piece = cmdArgs[cursor];

        let name = piece.slice(2, piece.indexOf("="));

        let option = this._options[name];

        if (!option) {

            result.addUnknownOption(`--${name}`);
            return 1;
        }

        if (option.isInput()) {

            let arg = piece.slice(3 + name.length);

            if (arg.length === 0) {

                if (option.defaultArgument === undefined) {

                    throw new Exception(
                        Errors.E_LACK_OPTION_ARG,
                        `Option "-${option.shortcut}" requires an argument.`
                    );
                }

                arg = option.defaultArgument;
            }

            if (option.repeatable) {

                result.addOption(
                    option.name,
                    arg
                );
            }
            else {

                result.setOption(
                    option.name,
                    arg
                );
            }

            return 1;
        }

        throw new Exception(
            Errors.E_ASSIGN_TO_FLAG,
            `Cannot assign a value to flag option "-${option.shortcut}".`
        );
    }

    /**
     * Pattern: --hello --world --input a.ts --output a.js ...
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param option  The option
     * @param result  The result object
     */
    protected _onFullAloneOption(
        cmdArgs: string[],
        cursor: number,
        option: Internal.IOption,
        result: Internal.IParseResult
    ): number {

        if (option) {

            return this._onAloneOption(
                cmdArgs,
                cursor,
                option,
                result
            );
        }

        result.addUnknownOption(cmdArgs[cursor]);
        return 1;
    }

    protected _onAloneOption(
        cmdArgs: string[],
        cursor: number,
        option: Internal.IOption,
        result: Internal.IParseResult
    ): number {

        if (option.isFlag()) {

            result.setFlagOption(option.name);
            return 1;
        }

        if (!this._settings.follow) {

            if (option.defaultArgument !== undefined) {

                if (option.repeatable) {

                    result.addOption(
                        option.name,
                        option.defaultArgument
                    );
                }
                else {

                    result.setOption(
                        option.name,
                        option.defaultArgument
                    );
                }

                return 1;
            }

            throw new Exception(

                Errors.E_LACK_OPTION_ARG,
                `Option "${cmdArgs[cursor]}" requires an argument.`
            );
        }

        let nextPiece = cmdArgs[cursor + 1];

        if (nextPiece === undefined ||
            /^-[a-zA-Z]|--[A-Za-z]/.test(nextPiece)
        ) {

            if (option.isOptionalInput()) {

                if (option.repeatable) {

                    result.addOption(
                        option.name,
                        <string> option.defaultArgument
                    );
                }
                else {

                    result.setOption(
                        option.name,
                        <string> option.defaultArgument
                    );
                }

                return 1;
            }

            throw new Exception(
                Errors.E_LACK_OPTION_ARG,
                `Option "${cmdArgs[cursor]}" requires an argument.`
            );
        }

        if (option.repeatable) {

            result.addOption(
                option.name,
                nextPiece
            );
        }
        else {

            result.setOption(
                option.name,
                nextPiece
            );
        }

        return 2;
    }

}
