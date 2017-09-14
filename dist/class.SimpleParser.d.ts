import { IDictionary } from "@litert/core";
import { IParseResult } from "./class.ParseResult";
import { IOptionSetting } from "./class.Option";
export declare class SimpleParser {
    private _optionHandlers;
    _options: IDictionary<IDictionary<string>[]>;
    _args: string[];
    constructor();
    addOption(opts: IOptionSetting): SimpleParser;
    parse(): IParseResult;
    protected _hookNotOption(val: string): boolean;
}
