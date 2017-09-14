import { IDictionary, Exception } from "@litert/core";
import * as Errors from "./errors";

export interface ICommandSettings {

    "name": string;

    "description": string;

    "shortName"?: string;
}

export interface IMainCommandSettings extends ICommandSettings {

    "enableSubCommand"?: boolean;

    addSubCommand(opts: ICommandSettings): IMainCommandSettings;

    findSubCommand(name: string): ICommandSettings | void;
}

export class MainCommand implements IMainCommandSettings {

    public name: string;

    public description: string;

    public shortName?: string;

    public enableSubCommand?: boolean;

    private _subCommands: IDictionary<ICommandSettings>;

    public constructor(opts: ICommandSettings) {

        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;

        if (this.shortName !== undefined && !this.shortName.match(/^[a-z0-9]$/)) {

            throw new Exception(
                Errors.E_INVALID_SHORT_COMMAND,
                `Short name of command "${opts.name}" must be a single charactor.`
            );
        }

        this._subCommands = {};
    }

    public addSubCommand(opts: ICommandSettings): IMainCommandSettings {

        this._subCommands[opts.name] = new SubCommandOption(opts);

        if (opts.shortName) {

            this._subCommands[opts.shortName] = this._subCommands[opts.name];
        }

        this.enableSubCommand = true;

        return this;
    }

    public findSubCommand(name: string): ICommandSettings | void {

        return this.enableSubCommand ? this._subCommands[name] : undefined;
    }
}

class SubCommandOption implements ICommandSettings {

    public name: string;

    public description: string;

    public shortName?: string;

    public constructor(opts: ICommandSettings) {

        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
    }
}
