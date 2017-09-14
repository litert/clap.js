"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseResult {
    constructor(opts, args) {
        this._options = opts;
        this._arguments = args;
    }
    get options() {
        return this._options;
    }
    get success() {
        return this._success;
    }
    get error() {
        return this._error;
    }
    setSuccess() {
        this._success = true;
    }
    setFailure(error) {
        this._error = error;
    }
    existOption(name) {
        return this._options[name] ? true : false;
    }
    get optionCount() {
        return Object.keys(this._options).length;
    }
    get optionNames() {
        return Object.keys(this._options);
    }
    get argumentCount() {
        return this._arguments.length;
    }
    isMultiOption(name) {
        return this._options[name] && this._options[name].length > 1 ? true : false;
    }
    countOption(name) {
        return this._options[name] ? this._options[name].length : 0;
    }
    getOption(name, index = 0) {
        return this._options[name] && this._options[name][index];
    }
    getArgument(index = 0) {
        return this._arguments[index];
    }
    get arguments() {
        return this._arguments.slice(0);
    }
}
exports.ParseResult = ParseResult;
class CommandParseResult extends ParseResult {
    constructor(opts, args, cmds) {
        super(opts, args);
        this._mainCommand = cmds[0];
        this._subCommand = cmds[1];
    }
    setSuccess() {
        this._success = true;
    }
    setFailure(error) {
        this._error = error;
    }
    get mainCommand() {
        return this._mainCommand;
    }
    get subCommand() {
        return this._subCommand;
    }
}
exports.CommandParseResult = CommandParseResult;
//# sourceMappingURL=class.ParseResult.js.map