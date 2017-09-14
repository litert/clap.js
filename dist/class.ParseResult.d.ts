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
