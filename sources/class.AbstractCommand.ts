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

import { Exception } from "@litert/core";
import * as Errors from "./errors";
import { ICommandSettings } from "./interfaces";

abstract class AbstractCommand implements ICommandSettings {

    protected _name: string;

    protected _description: string;

    protected _shortcut?: string;

    public constructor(opts: ICommandSettings) {

        if (!/^[a-z0-9A-Z][-\w]+$/.test(opts.name)) {

            throw new Exception(
                Errors.E_INVALID_COMMAND_NAME,
                `Name "${opts.name}" for command is invalid.`
            );
        }

        this._name = opts.name;
        this._description = opts.description;

        if (opts.shortcut !== undefined
            && !/^[A-Za-z]$/.test(opts.shortcut)
        ) {

            throw new Exception(
                Errors.E_INVALID_SHORT_COMMAND,
                `Shortcut of command "${opts.name}" must be a single alphabet charactor.`
            );
        }

        this._shortcut = opts.shortcut;
    }

    public get name(): string {

        return this._name;
    }

    public get description(): string {

        return this._description;
    }

    public get shortcut(): string | undefined {

        return this._shortcut;
    }
}

export = AbstractCommand;
