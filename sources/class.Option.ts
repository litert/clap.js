/**
 * Following types of options are supported.
 *
 * 1. Without argument
 *   -v (--version), -rf (--recursive --force)
 * 2. With argument
 *   -f a.txt (--file a.txt)
 *   -o=a.txt (--output=a.txt)
 *   -oa.txt (--output=a.txt)
 */
import { IDictionary, Exception } from "@litert/core";
import * as Errors from "./errors";

export interface IOptionSetting {

    "name": string;

    "description": string;

    "argPlaceholders"?: string[];

    "shortName"?: string;

    "required"?: boolean;

    "multi"?: boolean;
}

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

        if (opts.shortName && opts.shortName.length !== 1) {

            throw new Exception(
                Errors.E_INVALID_SHORT_OPTION,
                "Short name of option must a single alphabet charactor."
            );
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
        else if (arg.match(/^-[a-zA-Z0-9]+$/) && this.shortName && arg.indexOf(this.shortName) > 0) {

            args[current] = arg = arg.replace(this.shortName, "");

            ret.success = true;

            if (arg === "-") {

                ret.advance = 1;
            }
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

        if (arg === `--${this.name}` || (this.shortName && arg === `-${this.shortName}`)) {

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
