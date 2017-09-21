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

import * as External from "./interfaces";
import { Exception } from "@litert/core";

export interface IOptionHandleResult {

    "success": boolean;

    "advance": number;

    "data"?: string;
}

export interface IOption extends External.IOptionSetting {

    isInput(): boolean;

    isOptionalInput(): boolean;

    isFlag(): boolean;
}

export interface IMainCommandSettings extends External.ICommandSettings {

    "enableSubCommand"?: boolean;

    addSubCommand(opts: External.ICommandSettings): IMainCommandSettings;

    findSubCommand(name: string): External.ICommandSettings | void;
}

export interface IParseResult extends External.IParseResult {

    setFlagOption(name: string): void;

    setOption(name: string, data: string): void;

    addOption(name: string, data: string): void;

    addUnknownOption(name: string): void;

    addArgument(val: string): void;

    setSuccess(): void;

    setFailure(error: Exception): void;
}

export interface ICommandParseResult extends IParseResult, External.ICommandParseResult {

    setMainCommand(cmd: string): void;

    setSubCommand(cmd: string): void;
}
