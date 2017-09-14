"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@litert/core");
const class_ParseResult_1 = require("./class.ParseResult");
const Errors = require("./errors");
const class_Commands_1 = require("./class.Commands");
const class_SimpleParser_1 = require("./class.SimpleParser");
class CommandParser extends class_SimpleParser_1.SimpleParser {
    constructor() {
        super();
        this._mainCommands = {};
    }
    addCommand(opts) {
        opts.name = opts.name.toLowerCase();
        if (opts.shortName) {
            opts.shortName = opts.shortName.toLowerCase();
        }
        if (this._mainCommands[opts.name]) {
            let tmp = new class_Commands_1.MainCommand(opts);
            tmp.enableSubCommand = this._mainCommands[opts.name].enableSubCommand;
            this._mainCommands[opts.name] = tmp;
        }
        else {
            this._mainCommands[opts.name] = new class_Commands_1.MainCommand(opts);
        }
        if (opts.shortName) {
            this._mainCommands[opts.shortName] = this._mainCommands[opts.name];
        }
        return this;
    }
    addSubCommand(main, opts) {
        main = main.toLowerCase();
        opts.name = opts.name.toLowerCase();
        if (opts.shortName) {
            opts.shortName = opts.shortName.toLowerCase();
        }
        if (this._mainCommands[main]) {
            this._mainCommands[main].addSubCommand(opts);
        }
        else {
            throw new core_1.Exception(Errors.E_INVALID_MAIN_COMMAND, `Main command "${main}" not found.`);
        }
        return this;
    }
    parse() {
        let ret;
        this._commands = [];
        let tmp = super.parse();
        ret = new class_ParseResult_1.CommandParseResult(tmp.options, tmp.arguments, this._commands);
        if (tmp.success) {
            switch (this._commands.length) {
                case 0:
                    ret.setFailure(new core_1.Exception(Errors.E_LACK_MAIN_COMMAND, "No command input."));
                    break;
                case 1:
                    if (this._mainCommands[this._commands[0]].enableSubCommand) {
                        ret.setFailure(new core_1.Exception(Errors.E_LACK_SUB_COMMAND, "No sub command input."));
                        break;
                    }
                default:
                    ret.setSuccess();
            }
        }
        else {
            ret.setFailure(tmp.error);
        }
        return ret;
    }
    _hookNotOption(val) {
        val = val.toLowerCase();
        if (!this._commands.length) {
            if (this._mainCommands[val] !== undefined) {
                this._commands.push(this._mainCommands[val].name);
                return true;
            }
            throw new core_1.Exception(Errors.E_UNAVAILABLE_MAIN_COMMAND, `Command "${val}" is not supported.`);
        }
        let mc = this._mainCommands[this._commands[0]];
        if (mc.enableSubCommand && this._commands.length === 1) {
            let sc = mc.findSubCommand(val);
            if (sc) {
                this._commands.push(sc.name);
                return true;
            }
            throw new core_1.Exception(Errors.E_UNAVAILABLE_MAIN_COMMAND, `Command "${val}" is not sub command of "${mc.name}".`);
        }
        return false;
    }
}
exports.CommandParser = CommandParser;
//# sourceMappingURL=class.CommandParser.js.map