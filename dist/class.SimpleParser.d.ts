import { IDictionary } from "@litert/core";
import * as Internal from "./internal";
import * as External from "./interfaces";
export declare class SimpleParser implements External.ISimpleParser {
    protected _options: IDictionary<Internal.IOption>;
    protected _shortOptions: IDictionary<Internal.IOption>;
    protected _settings: External.IParserSettings;
    constructor(opts?: External.IParserSettings);
    addOption(opts: External.IOptionSetting): SimpleParser;
    parse(cmdArgs: string[]): External.IParseResult;
    protected _parseLoop(cmdArgs: string[], cursor: number, result: Internal.IParseResult): number;
    protected _onHandlingOption(cmdArgs: string[], cursor: number, result: Internal.IParseResult): number;
    /**
     * Pattern: -h -v -i a.ts -o a.js ...
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param option  The option
     * @param result  The result object
     */
    protected _onShortAloneOption(cmdArgs: string[], cursor: number, option: Internal.IOption, result: Internal.IParseResult): number;
    /**
     * Pattern: -ia.ts -oa.js -O3
     *
     * @param option  The option descriptor object
     * @param piece   The current piece of arguments
     * @param result  The result object
     */
    protected _onShortAttachOption(option: Internal.IOption, piece: string, result: Internal.IParseResult): number;
    /**
     * Pattern: -zxvf
     *
     * @param piece   The current piece of arguments
     * @param result  The result object
     */
    protected _onShortCompactedOption(piece: string, result: Internal.IParseResult): number;
    /**
     * Pattern: -i=a.ts -o=a.ts
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param result  The result object
     */
    protected _onShortAssignOption(cmdArgs: string[], cursor: number, result: Internal.IParseResult): number;
    /**
     * Pattern: --input=a.ts --output=a.ts
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param result  The result object
     */
    protected _onFullAssignOption(cmdArgs: string[], cursor: number, result: Internal.IParseResult): number;
    /**
     * Pattern: --hello --world --input a.ts --output a.js ...
     *
     * @param cmdArgs The arguments list
     * @param cursor  The cursor of list
     * @param option  The option
     * @param result  The result object
     */
    protected _onFullAloneOption(cmdArgs: string[], cursor: number, option: Internal.IOption, result: Internal.IParseResult): number;
    protected _onAloneOption(cmdArgs: string[], cursor: number, option: Internal.IOption, result: Internal.IParseResult): number;
}
