import * as External from "./interfaces";
import * as Internal from "./internal";
import { SimpleParser } from "./class.SimpleParser";
export declare class CommandParser extends SimpleParser implements External.ICommandParser {
    private _mainCommands;
    private _shortMainCommands;
    constructor(opts?: External.IParserSettings);
    addCommand(opts: External.ICommandSettings): External.ICommandParser;
    addSubCommand(main: string, opts: External.ICommandSettings): External.ICommandParser;
    parse(): External.ICommandParseResult;
    protected _parseLoop(cmdArgs: string[], cursor: number, result: Internal.ICommandParseResult): number;
    protected _tryParseCommand(piece: string, result: Internal.ICommandParseResult): number;
}
