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
const core_1 = require("@litert/core");
const Errors = require("./errors");
class Option {
    constructor(opts) {
        if (!/^[-a-zA-Z0-9]+$/.test(opts.name)) {
            throw new core_1.Exception(Errors.E_INVALID_OPTION_NAME, `Name of option "--${opts.name}" is invalid.`);
        }
        if (opts.shortcut) {
            if (opts.shortcut.length !== 1
                || !/^[a-zA-Z]$/.test(opts.shortcut)) {
                throw new core_1.Exception(Errors.E_INVALID_SHORT_OPTION, `Shortcut of option "--${opts.name}" must a single alphabet charactor.`);
            }
        }
        this.name = opts.name;
        this.description = opts.description;
        this.shortcut = opts.shortcut;
        this.repeatable = opts.repeatable;
        this.withArgument = opts.withArgument ? true : false;
        if (this.withArgument && opts.defaultArgument !== undefined) {
            this.defaultArgument = opts.defaultArgument;
        }
    }
    isInput() {
        return this.withArgument;
    }
    isOptionalInput() {
        return this.defaultArgument !== undefined;
    }
    isFlag() {
        return !this.withArgument;
    }
}
module.exports = Option;
//# sourceMappingURL=class.Option.js.map