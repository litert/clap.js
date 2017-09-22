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
class ParseResult {
    constructor() {
        this._options = {};
        this._arguments = [];
        this._unknownOptions = [];
    }
    addArgument(val) {
        this._arguments.push(val);
    }
    addUnknownOption(name) {
        if (this._unknownOptions.indexOf(name) === -1) {
            this._unknownOptions.push(name);
        }
    }
    addOption(name, value) {
        if (!this._options[name]) {
            this._options[name] = [];
        }
        this._options[name].push(value);
    }
    setOption(name, data) {
        this._options[name] = [data];
    }
    setFlagOption(name) {
        if (!this._options[name]) {
            this._options[name] = [];
        }
    }
    get options() {
        return this._options;
    }
    get unknwonOptions() {
        return this._unknownOptions;
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
    get optionNames() {
        return Object.keys(this._options);
    }
    isOptionRepeated(name) {
        return this._options[name] && this._options[name].length > 1 ? true : false;
    }
    getOptionLength(name) {
        return this._options[name] ? this._options[name].length : 0;
    }
    getOption(name, index = 0) {
        return this._options[name] && this._options[name][index];
    }
    get arguments() {
        return this._arguments.slice(0);
    }
}
exports.ParseResult = ParseResult;
class CommandParseResult extends ParseResult {
    constructor() {
        super();
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
    setMainCommand(cmd) {
        this._mainCommand = cmd;
    }
    setSubCommand(cmd) {
        this._subCommand = cmd;
    }
}
exports.CommandParseResult = CommandParseResult;
//# sourceMappingURL=class.ParseResult.js.map