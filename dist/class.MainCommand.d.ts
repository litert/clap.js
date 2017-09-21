import { ICommandSettings } from "./interfaces";
import { IMainCommandSettings } from "./internal";
import AbstractCommand = require("./class.AbstractCommand");
declare class MainCommand extends AbstractCommand implements IMainCommandSettings {
    enableSubCommand?: boolean;
    private _subCommands;
    private _shortSubCommands;
    readonly name: string;
    constructor(opts: ICommandSettings);
    addSubCommand(opts: ICommandSettings): IMainCommandSettings;
    findSubCommand(name: string): ICommandSettings | void;
}
export = MainCommand;
