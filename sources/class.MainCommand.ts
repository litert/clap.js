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

import * as Errors from "./errors";
import { IDictionary } from "@litert/core";
import Exception from "./class.Exception";
import { ICommandSettings } from "./interfaces";
import { IMainCommandSettings } from "./internal";
import AbstractCommand = require("./class.AbstractCommand");

class MainCommand extends AbstractCommand implements IMainCommandSettings {

    public enableSubCommand?: boolean;

    private _subCommands: IDictionary<ICommandSettings>;

    private _shortSubCommands: IDictionary<ICommandSettings>;

    public get name(): string {

        return this._name;
    }

    public constructor(opts: ICommandSettings) {

        super(opts);

        this._subCommands = {};

        this._shortSubCommands = {};
    }

    public addSubCommand(opts: ICommandSettings): IMainCommandSettings {

        opts.name = opts.name.toLowerCase();

        if (this._subCommands[opts.name]) {

            throw new Exception(
                Errors.E_DUPLICATED_SUB_COMMAND,
                `Sub command "${opts.name}" already exists.`
            );
        }

        this._subCommands[opts.name] = new SubCommandOption(opts);

        if (opts.shortcut) {

            if (this._shortSubCommands[opts.shortcut]) {

                throw new Exception(
                    Errors.E_DUPLICATED_SUB_SHORTCUT,
                    `Shourcut "${opts.shortcut}" of sub command already exists.`
                );
            }

            this._shortSubCommands[opts.shortcut] = this._subCommands[opts.name];
        }

        this.enableSubCommand = true;

        return this;
    }

    public findSubCommand(name: string): ICommandSettings | void {

        return name.length === 1 ?
            this._shortSubCommands[name] :
            this._subCommands[name.toLowerCase()];
    }
}

class SubCommandOption extends AbstractCommand {}

export = MainCommand;
