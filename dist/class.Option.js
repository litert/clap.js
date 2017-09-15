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
class OptionConstructor {
    constructor(opts) {
        if (opts.shortName) {
            if (opts.shortName.length !== 1
                || !/^[0-9a-zA-Z]$/.test(opts.shortName)) {
                throw new core_1.Exception(Errors.E_INVALID_SHORT_OPTION, "Short name of option must a single alphabet or digtal charactor.");
            }
        }
        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
        this.multi = opts.multi;
        this.required = opts.required;
        if (opts.argPlaceholders) {
            this.argPlaceholders = opts.argPlaceholders;
        }
    }
}
exports.OptionConstructor = OptionConstructor;
class ArgLessOptionHandler extends OptionConstructor {
    constructor(opts) {
        super(opts);
    }
    handle(args, current) {
        let ret = {
            "success": false
        };
        let arg = args[current];
        if (arg === `--${this.name}`) {
            ret.success = true;
            ret.advance = 1;
        }
        else if (arg.match(/^-[a-zA-Z0-9]+$/)
            && this.shortName
            && arg.indexOf(this.shortName) > 0) {
            args[current] = arg = arg.replace(this.shortName, "");
            ret.success = true;
            ret.advance = arg === "-" ? 1 : 0;
        }
        return ret;
    }
}
exports.ArgLessOptionHandler = ArgLessOptionHandler;
class ArgOptionHandler extends OptionConstructor {
    constructor(opts) {
        super(opts);
    }
    handle(args, current) {
        let ret = {
            "success": false
        };
        let arg = args[current];
        if (arg === `--${this.name}`
            || (this.shortName && arg === `-${this.shortName}`)) {
            ret.success = true;
            let i = 1;
            ret.data = {};
            for (let ph of this.argPlaceholders) {
                if (current + i >= args.length) {
                    throw new core_1.Exception(Errors.E_LACK_OPTION_ARG, `Failed to read argument ${ph} for option --${this.name}.`);
                }
                if (args[current + i] !== undefined) {
                    ret.data[ph] = args[current + i];
                }
                else {
                    throw new core_1.Exception(Errors.E_LACK_OPTION_ARG, `Failed to read argument ${ph} for option --${this.name}.`);
                }
                i++;
            }
            ret.advance = 1 + this.argPlaceholders.length;
        }
        return ret;
    }
}
exports.ArgOptionHandler = ArgOptionHandler;
//# sourceMappingURL=class.Option.js.map