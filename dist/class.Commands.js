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
class MainCommand {
    constructor(opts) {
        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
        if (this.shortName !== undefined
            && !/^[A-Za-z0-9]$/.test(this.shortName)) {
            throw new core_1.Exception(Errors.E_INVALID_SHORT_COMMAND, `Short name of command "${opts.name}" must be a single charactor.`);
        }
        this._subCommands = {};
    }
    addSubCommand(opts) {
        this._subCommands[opts.name] = new SubCommandOption(opts);
        if (opts.shortName) {
            this._subCommands[opts.shortName] = this._subCommands[opts.name];
        }
        this.enableSubCommand = true;
        return this;
    }
    findSubCommand(name) {
        return this.enableSubCommand ? this._subCommands[name] : undefined;
    }
}
exports.MainCommand = MainCommand;
class SubCommandOption {
    constructor(opts) {
        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
    }
}
//# sourceMappingURL=class.Commands.js.map