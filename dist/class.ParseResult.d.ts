import { IDictionary, Exception } from "@litert/core";
import { IParseResult, ICommandParseResult } from "./interfaces";
export declare class ParseResult implements IParseResult {
    protected _success: boolean;
    protected _error?: Exception;
    protected _arguments: string[];
    protected _options: IDictionary<IDictionary<string>[]>;
    constructor(opts: IDictionary<IDictionary<string>[]>, args: string[]);
    readonly options: IDictionary<IDictionary<string>[]>;
    readonly success: boolean;
    readonly error: Exception | undefined;
    setSuccess(): void;
    setFailure(error: Exception): void;
    existOption(name: string): boolean;
    readonly optionCount: number;
    readonly optionNames: string[];
    readonly argumentCount: number;
    isMultiOption(name: string): boolean;
    countOption(name: string): number;
    getOption(name: string, index?: number): IDictionary<string>;
    getArgument(index?: number): string;
    readonly arguments: string[];
}
export declare class CommandParseResult extends ParseResult implements ICommandParseResult {
    protected _mainCommand: string;
    protected _subCommand: string;
    constructor(opts: IDictionary<IDictionary<string>[]>, args: string[], cmds: string[]);
    setSuccess(): void;
    setFailure(error: Exception): void;
    readonly mainCommand: string;
    readonly subCommand: string;
}
