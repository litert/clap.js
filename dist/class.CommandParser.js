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
const class_ParseResult_1 = require("./class.ParseResult");
const Errors = require("./errors");
const MainCommand = require("./class.MainCommand");
const class_SimpleParser_1 = require("./class.SimpleParser");
class CommandParser extends class_SimpleParser_1.SimpleParser {
    constructor(opts) {
        super(opts);
        this._mainCommands = {};
        this._shortMainCommands = {};
    }
    addCommand(opts) {
        opts.name = opts.name.toLowerCase();
        if (this._mainCommands[opts.name]) {
            throw new core_1.Exception(Errors.E_DUPLICATED_MAIN_COMMAND, `Main command "${opts.name}" already exists.`);
        }
        this._mainCommands[opts.name] = new MainCommand(opts);
        if (opts.shortcut) {
            if (this._shortMainCommands[opts.shortcut]) {
                throw new core_1.Exception(Errors.E_DUPLICATED_MAIN_SHORTCUT, `Shourcut "${opts.shortcut}" of main command already exists.`);
            }
            this._shortMainCommands[opts.shortcut] = this._mainCommands[opts.name];
        }
        return this;
    }
    addSubCommand(main, opts) {
        main = main.toLowerCase();
        if (this._mainCommands[main]) {
            this._mainCommands[main].addSubCommand(opts);
        }
        else {
            throw new core_1.Exception(Errors.E_INVALID_MAIN_COMMAND, `Main command "${main}" not found.`);
        }
        return this;
    }
    parse() {
        let cmdArgs = process.argv.slice(2);
        let cursor = 0;
        let ret = new class_ParseResult_1.CommandParseResult();
        try {
            while (cursor < cmdArgs.length) {
                cursor += this._parseLoop(cmdArgs, cursor, ret);
            }
            if (!ret.mainCommand) {
                throw new core_1.Exception(Errors.E_LACK_MAIN_COMMAND, "No command input.");
            }
            if (!ret.subCommand && this._mainCommands[ret.mainCommand].enableSubCommand) {
                throw new core_1.Exception(Errors.E_LACK_SUB_COMMAND, "No sub command input.");
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
            return this._tryParseCommand(piece, result);
        }
        return this._onHandlingOption(cmdArgs, cursor, result);
    }
    _tryParseCommand(piece, result) {
        if (!Object.keys(this._mainCommands).length) {
            result.addArgument(piece);
            return 1;
        }
        if (!result.mainCommand) {
            let mainCommand = piece.length === 1 ?
                this._shortMainCommands[piece] :
                this._mainCommands[piece.toLowerCase()];
            if (!mainCommand) {
                throw new core_1.Exception(Errors.E_INVALID_MAIN_COMMAND, `Main command "${piece}" not found.`);
            }
            result.setMainCommand(mainCommand.name);
            return 1;
        }
        else if (!result.subCommand) {
            let mainCommand = this._mainCommands[result.mainCommand];
            if (mainCommand.enableSubCommand) {
                let subCommand = mainCommand.findSubCommand(piece);
                if (!subCommand) {
                    throw new core_1.Exception(Errors.E_INVALID_SUB_COMMAND, `Sub command "${piece}" not found.`);
                }
                result.setSubCommand(subCommand.name);
                return 1;
            }
        }
        result.addArgument(piece);
        return 1;
    }
}
exports.CommandParser = CommandParser;
//# sourceMappingURL=class.CommandParser.js.map