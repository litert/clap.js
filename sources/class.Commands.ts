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
import { ICommandSettings } from "./interfaces";
export interface IMainCommandSettings extends ICommandSettings {

    "enableSubCommand"?: boolean;

    addSubCommand(opts: ICommandSettings): IMainCommandSettings;

    findSubCommand(name: string): ICommandSettings | void;
}

export class MainCommand implements IMainCommandSettings {

    public name: string;

    public description: string;

    public shortName?: string;

    public enableSubCommand?: boolean;

    private _subCommands: IDictionary<ICommandSettings>;

    public constructor(opts: ICommandSettings) {

        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;

        if (this.shortName !== undefined
            && !/^[A-Za-z0-9]$/.test(this.shortName)
        ) {

            throw new Exception(
                Errors.E_INVALID_SHORT_COMMAND,
                `Short name of command "${opts.name}" must be a single charactor.`
            );
        }

        this._subCommands = {};
    }

    public addSubCommand(opts: ICommandSettings): IMainCommandSettings {

        this._subCommands[opts.name] = new SubCommandOption(opts);

        if (opts.shortName) {

            this._subCommands[opts.shortName] = this._subCommands[opts.name];
        }

        this.enableSubCommand = true;

        return this;
    }

    public findSubCommand(name: string): ICommandSettings | void {

        return this.enableSubCommand ? this._subCommands[name] : undefined;
    }
}

class SubCommandOption implements ICommandSettings {

    public name: string;

    public description: string;

    public shortName?: string;

    public constructor(opts: ICommandSettings) {

        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
    }
}
