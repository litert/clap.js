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

import Exception = require("./class.Exception");
import * as Errors from "./errors";
import * as External from "./interfaces";
import * as Internal from "./internal";

class Option implements Internal.IOption {

    public name: string;

    public description: string;

    public withArgument: boolean;

    public defaultArgument: string;

    public shortcut?: string;

    public repeatable?: boolean;

    public constructor(opts: External.IOptionSetting) {

        if ( !/^[-a-zA-Z0-9]+$/.test(opts.name)
        ) {

            throw new Exception(
                Errors.E_INVALID_OPTION_NAME,
                `Name of option "--${opts.name}" is invalid.`
            );
        }

        if (opts.shortcut) {

            if (opts.shortcut.length !== 1
                || !/^[a-zA-Z]$/.test(opts.shortcut)
            ) {

                throw new Exception(
                    Errors.E_INVALID_SHORT_OPTION,
                    `Shortcut of option "--${opts.name}" must a single alphabet charactor.`
                );
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

    public isInput(): boolean {

        return this.withArgument;
    }

    public isOptionalInput(): boolean {

        return this.defaultArgument !== undefined;
    }

    public isFlag(): boolean {

        return !this.withArgument;
    }
}

export = Option;
