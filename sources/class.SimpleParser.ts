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
import { ParseResult } from "./class.ParseResult";
import * as Errors from "./errors";
import * as Def from "./interfaces";

import {
    IOption,
    ArgLessOptionHandler,
    ArgOptionHandler
} from "./class.Option";

export class SimpleParser implements Def.ISimpleParser {

    private _optionHandlers: IDictionary<IOption>;

    protected _options: IDictionary<IDictionary<string>[]>;

    protected _args: string[];

    public constructor() {

        this._optionHandlers = {};

        this._options = {};

        this._args = [];
    }

    public addOption(opts: Def.IOptionSetting): SimpleParser {

        if (opts.argPlaceholders) {

            this._optionHandlers[opts.name] = new ArgOptionHandler(opts);
        }
        else {

            this._optionHandlers[opts.name] = new ArgLessOptionHandler(opts);
        }

        return this;
    }

    public parse(): Def.IParseResult {

        let args: string[] = process.argv.slice(2);

        let pos: number = 0;

        let ret: ParseResult;

        try {

            while (pos < args.length) {

                if (!args[pos].startsWith("-")) {

                    if (!this._hookNotOption(args[pos])) {

                        this._args.push(args[pos]);
                    }

                    pos++;

                    continue;
                }

                let done: boolean = false;

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

                        let opt: IDictionary<string> = {};

                        pos += <number> result.advance;

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

                    throw new Exception(
                        Errors.E_LACK_OPTION,
                        `Option "${optName}" is required.`
                    );
                }
            }

            ret = new ParseResult(this._options, this._args);

            ret.setSuccess();
        }
        catch (e) {

            ret = new ParseResult(this._options, this._args);

            ret.setFailure(e);
        }

        this._args = [];
        this._options = {};

        return ret;
    }

    protected _hookNotOption(val: string): boolean {

        return false;
    }
}
