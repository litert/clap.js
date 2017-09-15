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
const class_Option_1 = require("./class.Option");
class SimpleParser {
    constructor() {
        this._optionHandlers = {};
        this._options = {};
        this._args = [];
    }
    addOption(opts) {
        if (opts.argPlaceholders) {
            this._optionHandlers[opts.name] = new class_Option_1.ArgOptionHandler(opts);
        }
        else {
            this._optionHandlers[opts.name] = new class_Option_1.ArgLessOptionHandler(opts);
        }
        return this;
    }
    parse() {
        let args = process.argv.slice(2);
        let pos = 0;
        let ret;
        try {
            while (pos < args.length) {
                if (!args[pos].startsWith("-")) {
                    if (!this._hookNotOption(args[pos])) {
                        this._args.push(args[pos]);
                    }
                    pos++;
                    continue;
                }
                let done = false;
                for (let optName in this._optionHandlers) {
                    let option = this._optionHandlers[optName];
                    let result = option.handle(args, pos);
                    if (result.success) {
                        done = true;
                        if (!this._options[option.name]) {
                            this._options[option.name] = [];
                        }
                        else if (!option.multi && !option.argPlaceholders) {
                            continue;
                        }
                        let opt = {};
                        pos += result.advance;
                        if (result.data) {
                            for (let key in result.data) {
                                opt[key] = result.data[key];
                            }
                        }
                        if (this._options[option.name].length && !option.multi) {
                            this._options[option.name][0] = opt;
                        }
                        else {
                            this._options[option.name].push(opt);
                        }
                        break;
                    }
                }
                if (!done) {
                    if (!this._hookNotOption(args[pos])) {
                        this._args.push(args[pos]);
                    }
                    pos++;
                }
            }
            for (let optName in this._optionHandlers) {
                if (this._optionHandlers[optName].required && !this._options[optName]) {
                    throw new core_1.Exception(Errors.E_LACK_OPTION, `Option "${optName}" is required.`);
                }
            }
            ret = new class_ParseResult_1.ParseResult(this._options, this._args);
            ret.setSuccess();
        }
        catch (e) {
            ret = new class_ParseResult_1.ParseResult(this._options, this._args);
            ret.setFailure(e);
        }
        this._args = [];
        this._options = {};
        return ret;
    }
    _hookNotOption(val) {
        return false;
    }
}
exports.SimpleParser = SimpleParser;
//# sourceMappingURL=class.SimpleParser.js.map