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
class AbstractCommand {
    constructor(opts) {
        this._name = opts.name;
        this._description = opts.description;
        if (opts.shortcut !== undefined
            && !/^[A-Za-z]$/.test(opts.shortcut)) {
            throw new core_1.Exception(Errors.E_INVALID_SHORT_COMMAND, `Shortcut of command "${opts.name}" must be a single alphabet charactor.`);
        }
        this._shortcut = opts.shortcut;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get shortcut() {
        return this._shortcut;
    }
}
module.exports = AbstractCommand;
//# sourceMappingURL=class.AbstractCommand.js.map