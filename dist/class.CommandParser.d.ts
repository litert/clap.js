import { ICommandParseResult, ICommandParser, ICommandSettings } from "./interfaces";
import { SimpleParser } from "./class.SimpleParser";
export declare class CommandParser extends SimpleParser implements ICommandParser {
    private _mainCommands;
    private _commands;
    constructor();
    addCommand(opts: ICommandSettings): ICommandParser;
    addSubCommand(main: string, opts: ICommandSettings): ICommandParser;
    parse(): ICommandParseResult;
    protected _hookNotOption(val: string): boolean;
}
