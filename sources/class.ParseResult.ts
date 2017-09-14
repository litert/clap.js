import { IDictionary, Exception } from "@litert/core";

export interface IParseResult {

    /**
     * Detect if parse successfully.
     */
    "success": boolean;

    /**
     * The error info when failed to parse.
     */
    "error"?: Exception;

    /**
     * Get list of names of all found options.
     */
    "optionNames": string[];

    /**
     * How many options are found.
     */
    "optionCount": number;

    /**
     * How many arguments found.
     */
    "argumentCount": number;

    /**
     * Get list of all arguments found.
     */
    "arguments": string[];

    /**
     * Check if an option is set.
     */
    existOption(name: string): boolean;

    /**
     * Check if an option is multi set.
     */
    isMultiOption(name: string): boolean;

    /**
     * Check how many times an option is set.
     */
    countOption(name: string): number;

    /**
     * Get arguments list of option by index.
     */
    getOption(name: string, index: number): IDictionary<string>;

    /**
     * The the value of argument by index.
     */
    getArgument(index: number): string;
}

export interface ICommandParseResult extends IParseResult {

    "mainCommand"?: string;

    "subCommand"?: string;
}

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
