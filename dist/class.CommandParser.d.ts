import { ICommandParseResult } from "./class.ParseResult";
import { ICommandSettings } from "./class.Commands";
import { SimpleParser } from "./class.SimpleParser";
export declare class CommandParser extends SimpleParser {
    private _mainCommands;
    private _commands;
    constructor();
    addCommand(opts: ICommandSettings): CommandParser;
    addSubCommand(main: string, opts: ICommandSettings): CommandParser;
    parse(): ICommandParseResult;
    protected _hookNotOption(val: string): boolean;
}
