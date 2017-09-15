import { ICommandSettings } from "./interfaces";
export interface IMainCommandSettings extends ICommandSettings {
    "enableSubCommand"?: boolean;
    addSubCommand(opts: ICommandSettings): IMainCommandSettings;
    findSubCommand(name: string): ICommandSettings | void;
}
export declare class MainCommand implements IMainCommandSettings {
    name: string;
    description: string;
    shortName?: string;
    enableSubCommand?: boolean;
    private _subCommands;
    constructor(opts: ICommandSettings);
    addSubCommand(opts: ICommandSettings): IMainCommandSettings;
    findSubCommand(name: string): ICommandSettings | void;
}
