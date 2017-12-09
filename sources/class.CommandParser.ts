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

import { IDictionary } from "@litert/core";
import Exception from "./class.Exception";
import { CommandParseResult } from "./class.ParseResult";
import * as External from "./interfaces";
import * as Errors from "./errors";
import * as Internal from "./internal";
import MainCommand from "./class.MainCommand";
import SimpleParser from "./class.SimpleParser";

export class CommandParser extends SimpleParser implements External.ICommandParser {

    private _mainCommands: IDictionary<Internal.IMainCommandSettings>;

    private _shortMainCommands: IDictionary<Internal.IMainCommandSettings>;

    public constructor(opts?: External.IParserSettings) {

        super(opts);

        this._mainCommands = {};

        this._shortMainCommands = {};
    }

    public addCommand(opts: External.ICommandSettings): this {

        opts.name = opts.name.toLowerCase();

        if (this._mainCommands[opts.name]) {

            throw new Exception(
                Errors.E_DUPLICATED_MAIN_COMMAND,
                `Main command "${opts.name}" already exists.`
            );
        }

        this._mainCommands[opts.name] = new MainCommand(opts);

        if (opts.shortcut) {

            if (this._shortMainCommands[opts.shortcut]) {

                throw new Exception(
                    Errors.E_DUPLICATED_MAIN_SHORTCUT,
                    `Shourcut "${opts.shortcut}" of main command already exists.`
                );
            }

            this._shortMainCommands[opts.shortcut] = this._mainCommands[opts.name];
        }

        return this;
    }

    public addSubCommand(
        main: string,
        opts: External.ICommandSettings
    ): this {

        main = main.toLowerCase();

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

    public parse(cmdArgs: string[]): External.ICommandParseResult {

        let cursor: number = 0;

        let ret: Internal.ICommandParseResult = new CommandParseResult();

        try {

            while (cursor < cmdArgs.length) {

                cursor += this._parseLoop(
                    cmdArgs,
                    cursor,
                    ret
                );
            }

            if (!this._settings.allowOptionsOnly) {

                if (!ret.mainCommand) {

                    throw new Exception(
                        Errors.E_LACK_MAIN_COMMAND,
                        "No command input."
                    );
                }

                if (!ret.subCommand
                    && this._mainCommands[ret.mainCommand].enableSubCommand
                ) {

                    throw new Exception(
                        Errors.E_LACK_SUB_COMMAND,
                        "No sub command input."
                    );
                }
            }

            ret.setSuccess();
        }
        catch (e) {

            ret.setFailure(e);
        }

        return ret;
    }

    protected _parseLoop(
        cmdArgs: string[],
        cursor: number,
        result: Internal.ICommandParseResult
    ): number {

        let piece = cmdArgs[cursor];

        if (piece[0] !== "-") {

            return this._tryParseCommand(
                piece,
                result
            );
        }

        return this._onHandlingOption(
            cmdArgs,
            cursor,
            result
        );
    }

    protected _tryParseCommand(
        piece: string,
        result: Internal.ICommandParseResult
    ): number {

        if (!Object.keys(this._mainCommands).length) {

            result.addArgument(piece);

            return 1;
        }

        if (!result.mainCommand) {

            let mainCommand = piece.length === 1 ?
                this._shortMainCommands[piece] :
                this._mainCommands[piece.toLowerCase()];

            if (!mainCommand) {

                throw new Exception(
                    Errors.E_INVALID_MAIN_COMMAND,
                    `Main command "${piece}" not found.`
                );
            }

            result.setMainCommand(mainCommand.name);
            return 1;
        }
        else if (!result.subCommand) {

            let mainCommand = this._mainCommands[result.mainCommand];

            if (mainCommand.enableSubCommand) {

                let subCommand = mainCommand.findSubCommand(
                    piece
                );

                if (!subCommand) {

                    throw new Exception(
                        Errors.E_INVALID_SUB_COMMAND,
                        `Sub command "${piece}" not found.`
                    );
                }

                result.setSubCommand(subCommand.name);
                return 1;
            }
        }

        result.addArgument(piece);

        return 1;
    }
}
