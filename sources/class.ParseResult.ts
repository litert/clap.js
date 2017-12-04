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
import * as Internal from "./internal";

export class ParseResult implements Internal.IParseResult {

    protected _success: boolean;

    protected _error?: Exception;

    protected _arguments: string[];

    protected _unknownOptions: string[];

    protected _options: IDictionary<string[]>;

    public constructor() {

        this._options = {};

        this._arguments = [];

        this._unknownOptions = [];
    }

    public addArgument(val: string): void {

        this._arguments.push(val);
    }

    public addUnknownOption(name: string): void {

        if (this._unknownOptions.indexOf(name) === -1) {

            this._unknownOptions.push(name);
        }
    }

    public addOption(name: string, value: string): void {

        if (!this._options[name]) {

            this._options[name] = [];
        }

        this._options[name].push(value);
    }

    public setOption(name: string, data: string): void {

        this._options[name] = [data];
    }

    public setFlagOption(name: string): void {

        if (!this._options[name]) {

            this._options[name] = [];
        }
    }

    public get options(): IDictionary<string[]> {

        return this._options;
    }

    public get unknwonOptions(): string[] {

        return this._unknownOptions;
    }

    public get success(): boolean {

        return this._success;
    }

    public get error(): Exception | undefined {

        return this._error;
    }

    public setSuccess(): void {

        this._success = true;
    }

    public setFailure(error: Exception): void {

        this._error = error;
    }

    public existOption(name: string): boolean {

        return this._options[name] ? true : false;
    }

    public get optionNames(): string[] {

        return Object.keys(this._options);
    }

    public isOptionRepeated(name: string): boolean {

        return this._options[name] && this._options[name].length > 1 ? true : false;
    }

    public getOptionLength(name: string): number {

        return this._options[name] ? this._options[name].length : 0;
    }

    public getOption(name: string, index: number = 0): string {

        return this._options[name] && this._options[name][index];
    }

    public get arguments(): string[] {

        return this._arguments.slice(0);
    }
}

export class CommandParseResult extends ParseResult implements Internal.ICommandParseResult {

    protected _mainCommand: string;

    protected _subCommand: string;

    public constructor() {

        super();
    }

    public setSuccess(): void {

        this._success = true;
    }

    public setFailure(error: Exception): void {

        this._error = error;
    }

    public get mainCommand(): string {

        return this._mainCommand;
    }

    public get subCommand(): string {

        return this._subCommand;
    }

    public setMainCommand(cmd: string): void {

        this._mainCommand = cmd;
    }

    public setSubCommand(cmd: string): void {

        this._subCommand = cmd;
    }
}
