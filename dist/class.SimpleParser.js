"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@litert/core");
const Errors = require("./errors");
const class_ParseResult_1 = require("./class.ParseResult");
const Option = require("./class.Option");
const DEFAULT_PARSER_OPTIONS = {
    "follow": true,
    "fullAssign": false,
    "shortAssign": false,
    "shortAttach": false
};
class SimpleParser {
    constructor(opts) {
        this._options = {};
        this._shortOptions = {};
        this._settings = {};
        if (!opts) {
            opts = {};
        }
        let optss = opts;
        let mySettings = this._settings;
        let defValues = DEFAULT_PARSER_OPTIONS;
        for (let key in DEFAULT_PARSER_OPTIONS) {
            mySettings[key] = optss[key] === undefined ?
                defValues[key] :
                optss[key];
        }
    }
    addOption(opts) {
        opts.name = opts.name.toLowerCase();
        this._options[opts.name] = new Option(opts);
        if (opts.shortcut) {
            this._shortOptions[opts.shortcut] = this._options[opts.name];
        }
        return this;
    }
    parse() {
        let cmdArgs = process.argv.slice(2);
        let cursor = 0;
        let ret = new class_ParseResult_1.ParseResult();
        try {
            while (cursor < cmdArgs.length) {
                cursor += this._parseLoop(cmdArgs, cursor, ret);
            }
            ret.setSuccess();
        }
        catch (e) {
            ret.setFailure(e);
        }
        return ret;
    }
    _parseLoop(cmdArgs, cursor, result) {
        let piece = cmdArgs[cursor];
        if (piece[0] !== "-") {
            result.addArgument(piece);
            return 1;
        }
        return this._onHandlingOption(cmdArgs, cursor, result);
    }
    _onHandlingOption(cmdArgs, cursor, result) {
        let piece = cmdArgs[cursor];
        let option;
        piece = piece.trim();
        if (/^-[a-zA-Z]+$/.test(piece)) {
            option = this._shortOptions[piece[1]];
            if (piece.length === 2) {
                // short-alone pattern
                return this._onShortAloneOption(cmdArgs, cursor, option, result);
            }
            // compact-like pattern
            if (!option || option.isFlag()) {
                // short-compact pattern
                return this._onShortCompactedOption(piece, result);
            }
            // short-attach pattern
            return this._onShortAttachOption(option, piece, result);
        }
        else if (/^-[A-Za-z]\=.+$/.test(piece)) {
            // short-assign pattern
            return this._onShortAssignOption(cmdArgs, cursor, result);
        }
        else if (/^--[-A-Z0-9a-z]+\=.+$/.test(piece)) {
            // full-assign pattern
            return this._onFullAssignOption(cmdArgs, cursor, result);
            // error: only mono can be used in assign pattern.
        }
        else if (/^--[-A-Z0-9a-z]+$/.test(piece)) {
            // full-alone pattern
            option = this._options[piece.slice(2)];
            return this._onFullAloneOption(cmdArgs, cursor, option, result);
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
    _onShortAloneOption(cmdArgs, cursor, option, result) {
        if (option) {
            return this._onAloneOption(cmdArgs, cursor, option, result);
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
    _onShortAttachOption(option, piece, result) {
        if (!this._settings.shortAttach) {
            throw new core_1.Exception(Errors.E_FORBIDDEN_ATTACH, "Attaching an argument with an option is not allowed.");
        }
        // short-attach pattern
        if (option.repeatable) {
            result.addOption(option.name, piece.slice(2));
        }
        else {
            result.setOption(option.name, piece.slice(2));
        }
        return 1;
    }
    /**
     * Pattern: -zxvf
     *
     * @param piece   The current piece of arguments
     * @param result  The result object
     */
    _onShortCompactedOption(piece, result) {
        for (let shortName of piece.slice(1).split("")) {
            let option = this._shortOptions[shortName];
            if (option === undefined) {
                result.addUnknownOption(`-${shortName}`);
                continue;
            }
            if (!option.isFlag()) {
                throw new core_1.Exception(Errors.E_FORBIDDEN_COMPACT, `Option "-${shortName}" is not a flag option, cannot be compacted.`);
            }
            result.setFlagOption(option.name);
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
    _onShortAssignOption(cmdArgs, cursor, result) {
        if (!this._settings.shortAssign) {
            throw new core_1.Exception(Errors.E_FORBIDDEN_ASSIGN, `Assign mode is not allow.`);
        }
        let piece = cmdArgs[cursor];
        let option = this._shortOptions[piece[1]];
        if (!option) {
            result.addUnknownOption(`-${piece[1]}`);
            return 1;
        }
        if (option.isInput()) {
            if (option.repeatable) {
                result.addOption(option.name, piece.slice(3));
            }
            else {
                result.setOption(option.name, piece.slice(3));
            }
            return 1;
        }
        throw new core_1.Exception(Errors.E_ASSIGN_TO_FLAG, `Cannot assign a value to flag option "-${option.shortcut}".`);
    }
    /**
     * Pattern: --input=a.ts --output=a.ts
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param result  The result object
     */
    _onFullAssignOption(cmdArgs, cursor, result) {
        if (!this._settings.fullAssign) {
            throw new core_1.Exception(Errors.E_FORBIDDEN_ASSIGN, `Assign mode is not allow.`);
        }
        let piece = cmdArgs[cursor];
        let name = piece.slice(2, piece.indexOf("="));
        let option = this._options[name];
        if (!option) {
            result.addUnknownOption(`--${name}`);
            return 1;
        }
        if (option.isInput()) {
            if (option.repeatable) {
                result.addOption(option.name, piece.slice(3 + name.length));
            }
            else {
                result.setOption(option.name, piece.slice(3 + name.length));
            }
            return 1;
        }
        throw new core_1.Exception(Errors.E_ASSIGN_TO_FLAG, `Cannot assign a value to flag option "-${option.shortcut}".`);
    }
    /**
     * Pattern: --hello --world --input a.ts --output a.js ...
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param option  The option
     * @param result  The result object
     */
    _onFullAloneOption(cmdArgs, cursor, option, result) {
        if (option) {
            return this._onAloneOption(cmdArgs, cursor, option, result);
        }
        result.addUnknownOption(cmdArgs[cursor]);
        return 1;
    }
    _onAloneOption(cmdArgs, cursor, option, result) {
        if (option.isFlag()) {
            result.setFlagOption(option.name);
            return 1;
        }
        if (!this._settings.follow) {
            throw new core_1.Exception(Errors.E_LACK_OPTION_ARG, `An argument is required for option "${cmdArgs[cursor]}".`);
        }
        let nextPiece = cmdArgs[cursor + 1];
        if (nextPiece === undefined ||
            /^-[a-zA-Z]|--[A-Za-z]/.test(nextPiece)) {
            if (option.isOptionalInput()) {
                if (option.repeatable) {
                    result.addOption(option.name, option.defaultArgument);
                }
                else {
                    result.setOption(option.name, option.defaultArgument);
                }
                return 1;
            }
            throw new core_1.Exception(Errors.E_LACK_OPTION_ARG, `Option "${cmdArgs[cursor]}" requires an argument.`);
        }
        if (option.repeatable) {
            result.addOption(option.name, nextPiece);
        }
        else {
            result.setOption(option.name, nextPiece);
        }
        return 2;
    }
}
exports.SimpleParser = SimpleParser;
//# sourceMappingURL=class.SimpleParser.js.map