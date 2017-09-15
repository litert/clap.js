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
import { CommandParseResult, ParseResult } from "./class.ParseResult";
import {
    ICommandParseResult,
    ICommandParser,
    ICommandSettings
} from "./interfaces";
import * as Errors from "./errors";
import {
    IMainCommandSettings,
    MainCommand
} from "./class.Commands";

import { SimpleParser } from "./class.SimpleParser";

export class CommandParser extends SimpleParser implements ICommandParser {

    private _mainCommands: IDictionary<IMainCommandSettings>;

    private _commands: string[];

    public constructor() {

        super();

        this._mainCommands = {};
    }

    public addCommand(opts: ICommandSettings): ICommandParser {

        opts.name = opts.name.toLowerCase();

        if (opts.shortName) {

            opts.shortName = opts.shortName.toLowerCase();
        }

        if (this._mainCommands[opts.name]) {

            let tmp = new MainCommand(opts);

            tmp.enableSubCommand = this._mainCommands[opts.name].enableSubCommand;

            this._mainCommands[opts.name] = tmp;
        }
        else {

            this._mainCommands[opts.name] = new MainCommand(opts);
        }

        if (opts.shortName) {

            this._mainCommands[opts.shortName] = this._mainCommands[opts.name];
        }

        return this;
    }

    public addSubCommand(
        main: string,
        opts: ICommandSettings
    ): ICommandParser {

        main = main.toLowerCase();

        opts.name = opts.name.toLowerCase();

        if (opts.shortName) {

            opts.shortName = opts.shortName.toLowerCase();
        }

        if (this._mainCommands[main]) {

            this._mainCommands[main].addSubCommand(opts);
        }
        else {

            throw new Exception(
                Errors.E_INVALID_MAIN_COMMAND,
                `Main command "${main}" not found.`
            );
        }

        return this;
    }

    public parse(): ICommandParseResult {

        let ret: CommandParseResult;

        this._commands = [];

        let tmp: ParseResult = <ParseResult> super.parse();

        ret = new CommandParseResult(tmp.options, tmp.arguments, this._commands);

        if (tmp.success) {

            switch (this._commands.length) {
            case 0:

                ret.setFailure(new Exception(
                    Errors.E_LACK_MAIN_COMMAND,
                    "No command input."
                ));
                break;

            case 1:

                if (this._mainCommands[this._commands[0]].enableSubCommand) {

                    ret.setFailure(new Exception(
                        Errors.E_LACK_SUB_COMMAND,
                        "No sub command input."
                    ));

                    break;
                }

            default:

                ret.setSuccess();
            }
        }
        else {

            ret.setFailure(<Exception> tmp.error);
        }

        return ret;
    }

    protected _hookNotOption(val: string): boolean {

        val = val.toLowerCase();

        if (!this._commands.length) {

            if (this._mainCommands[val] !== undefined) {

                this._commands.push(this._mainCommands[val].name);
                return true;
            }

            throw new Exception(
                Errors.E_INVALID_MAIN_COMMAND,
                `Command "${val}" is not supported.`
            );
        }

        let mc = this._mainCommands[this._commands[0]];

        if (mc.enableSubCommand && this._commands.length === 1) {

            let sc = mc.findSubCommand(val);

            if (sc) {

                this._commands.push(sc.name);
                return true;
            }

            throw new Exception(
                Errors.E_INVALID_SUB_COMMAND,
                `Command "${val}" is not sub command of "${mc.name}".`
            );
        }

        return false;
    }
}
