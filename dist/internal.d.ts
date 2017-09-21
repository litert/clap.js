import * as External from "./interfaces";
import { Exception } from "@litert/core";
export interface IOptionHandleResult {
    "success": boolean;
    "advance": number;
    "data"?: string;
}
export interface IOption extends External.IOptionSetting {
    isInput(): boolean;
    isOptionalInput(): boolean;
    isFlag(): boolean;
}
export interface IMainCommandSettings extends External.ICommandSettings {
    "enableSubCommand"?: boolean;
    addSubCommand(opts: External.ICommandSettings): IMainCommandSettings;
    findSubCommand(name: string): External.ICommandSettings | void;
}
export interface IParseResult extends External.IParseResult {
    setFlagOption(name: string): void;
    setOption(name: string, data: string): void;
    addOption(name: string, data: string): void;
    addUnknownOption(name: string): void;
    addArgument(val: string): void;
    setSuccess(): void;
    setFailure(error: Exception): void;
}
export interface ICommandParseResult extends IParseResult, External.ICommandParseResult {
    setMainCommand(cmd: string): void;
    setSubCommand(cmd: string): void;
}
