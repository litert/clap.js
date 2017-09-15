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

import { IDictionary, Exception } from "@litert/core";
import * as Errors from "./errors";
import { IOptionSetting } from "./interfaces";

export interface IOptionHandleResult {

    "success": boolean;

    "advance"?: number;

    "data"?: IDictionary<string>;
}

export interface IOptionHandleOkayResult extends IOptionHandleResult {

    "success": true;

    "advance"?: number;

    "data"?: IDictionary<string>;
}

export interface IOption extends IOptionSetting {

    handle(args: string[], current: number): IOptionHandleResult;
}

export abstract class OptionConstructor implements IOption {

    public name: string;

    public description: string;

    public argPlaceholders: string[];

    public shortName?: string;

    public multi?: boolean;

    public required?: boolean;

    public constructor(opts: IOptionSetting) {

        if (opts.shortName) {

            if (opts.shortName.length !== 1
                || !/^[0-9a-zA-Z]$/.test(opts.shortName)
            ) {

                throw new Exception(
                    Errors.E_INVALID_SHORT_OPTION,
                    "Short name of option must a single alphabet or digtal charactor."
                );
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

    public abstract handle(args: string[], current: number): IOptionHandleResult;
}

export class ArgLessOptionHandler extends OptionConstructor {

    public constructor(opts: IOptionSetting) {

        super(opts);
    }

    public handle(args: string[], current: number): IOptionHandleResult {

        let ret: IOptionHandleResult = {
            "success": false
        };

        let arg = args[current];

        if (arg === `--${this.name}`) {

            ret.success = true;
            ret.advance = 1;
        }
        else if (arg.match(/^-[a-zA-Z0-9]+$/)
                && this.shortName
                && arg.indexOf(this.shortName) > 0
        ) {

            args[current] = arg = arg.replace(this.shortName, "");

            ret.success = true;

            ret.advance = arg === "-" ? 1 : 0;
        }

        return ret;
    }
}

export class ArgOptionHandler extends OptionConstructor {

    public constructor(opts: IOptionSetting) {

        super(opts);
    }

    public handle(args: string[], current: number): IOptionHandleResult {

        let ret: IOptionHandleResult = {
            "success": false
        };

        let arg = args[current];

        if (arg === `--${this.name}`
            || (this.shortName && arg === `-${this.shortName}`)
        ) {

            ret.success = true;

            let i: number = 1;

            ret.data = {};

            for (let ph of this.argPlaceholders) {

                if (current + i >= args.length) {

                    throw new Exception(
                        Errors.E_LACK_OPTION_ARG,
                        `Failed to read argument ${ph} for option --${this.name}.`
                    );
                }

                if (args[current + i] !== undefined) {

                    ret.data[ph] = args[current + i];
                }
                else {

                    throw new Exception(
                        Errors.E_LACK_OPTION_ARG,
                        `Failed to read argument ${ph} for option --${this.name}.`
                    );
                }

                i++;
            }

            ret.advance = 1 + this.argPlaceholders.length;
        }

        return ret;
    }
}
