import { ICommandSettings } from "./interfaces";
declare abstract class AbstractCommand implements ICommandSettings {
    protected _name: string;
    protected _description: string;
    protected _shortcut?: string;
    constructor(opts: ICommandSettings);
    readonly name: string;
    readonly description: string;
    readonly shortcut: string | undefined;
}
export = AbstractCommand;
