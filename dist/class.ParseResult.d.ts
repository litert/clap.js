import { IDictionary, Exception } from "@litert/core";
import * as Internal from "./internal";
export declare class ParseResult implements Internal.IParseResult {
    protected _success: boolean;
    protected _error?: Exception;
    protected _arguments: string[];
    protected _unknownOptions: string[];
    protected _options: IDictionary<string[]>;
    constructor();
    addArgument(val: string): void;
    addUnknownOption(name: string): void;
    addOption(name: string, value: string): void;
    setOption(name: string, data: string): void;
    setFlagOption(name: string): void;
    readonly options: IDictionary<string[]>;
    readonly unknwonOptions: string[];
    readonly success: boolean;
    readonly error: Exception | undefined;
    setSuccess(): void;
    setFailure(error: Exception): void;
    existOption(name: string): boolean;
    readonly optionNames: string[];
    isOptionRepeated(name: string): boolean;
    getOptionLength(name: string): number;
    getOption(name: string, index?: number): string;
    readonly arguments: string[];
}
export declare class CommandParseResult extends ParseResult implements Internal.ICommandParseResult {
    protected _mainCommand: string;
    protected _subCommand: string;
    constructor();
    setSuccess(): void;
    setFailure(error: Exception): void;
    readonly mainCommand: string;
    readonly subCommand: string;
    setMainCommand(cmd: string): void;
    setSubCommand(cmd: string): void;
}
