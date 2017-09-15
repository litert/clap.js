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
import { IParseResult, ICommandParseResult } from "./interfaces";

export class ParseResult implements IParseResult {

    protected _success: boolean;

    protected _error?: Exception;

    protected _arguments: string[];

    protected _options: IDictionary<IDictionary<string>[]>;

    public constructor(opts: IDictionary<IDictionary<string>[]>, args: string[]) {

        this._options = opts;

        this._arguments = args;
    }

    public get options(): IDictionary<IDictionary<string>[]> {

        return this._options;
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

    public get optionCount(): number {

        return Object.keys(this._options).length;
    }

    public get optionNames(): string[] {

        return Object.keys(this._options);
    }

    public get argumentCount(): number {

        return this._arguments.length;
    }

    public isMultiOption(name: string): boolean {

        return this._options[name] && this._options[name].length > 1 ? true : false;
    }

    public countOption(name: string): number {

        return this._options[name] ? this._options[name].length : 0;
    }

    public getOption(name: string, index: number = 0): IDictionary<string> {

        return this._options[name] && this._options[name][index];
    }

    public getArgument(index: number = 0): string {

        return this._arguments[index];
    }

    public get arguments(): string[] {

        return this._arguments.slice(0);
    }
}

export class CommandParseResult extends ParseResult implements ICommandParseResult {

    protected _mainCommand: string;

    protected _subCommand: string;

    public constructor(opts: IDictionary<IDictionary<string>[]>, args: string[], cmds: string[]) {

        super(opts, args);

        this._mainCommand = cmds[0];

        this._subCommand = cmds[1];
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
}
