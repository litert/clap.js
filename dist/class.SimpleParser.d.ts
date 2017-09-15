import { IDictionary } from "@litert/core";
import * as Def from "./interfaces";
export declare class SimpleParser implements Def.ISimpleParser {
    private _optionHandlers;
    protected _options: IDictionary<IDictionary<string>[]>;
    protected _args: string[];
    constructor();
    addOption(opts: Def.IOptionSetting): SimpleParser;
    parse(): Def.IParseResult;
    protected _hookNotOption(val: string): boolean;
}
