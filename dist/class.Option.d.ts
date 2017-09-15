import { IDictionary } from "@litert/core";
import { IOptionSetting } from "./interfaces";
export interface IOptionHandleResult {
    "success": boolean;
    "advance"?: number;
    "data"?: IDictionary<string>;
}
export interface IOptionHandleOkayResult extends IOptionHandleResult {
    "success": true;
    "advance"?: number;
    "data"?: IDictionary<string>;
}
export interface IOption extends IOptionSetting {
    handle(args: string[], current: number): IOptionHandleResult;
}
export declare abstract class OptionConstructor implements IOption {
    name: string;
    description: string;
    argPlaceholders: string[];
    shortName?: string;
    multi?: boolean;
    required?: boolean;
    constructor(opts: IOptionSetting);
    abstract handle(args: string[], current: number): IOptionHandleResult;
}
export declare class ArgLessOptionHandler extends OptionConstructor {
    constructor(opts: IOptionSetting);
    handle(args: string[], current: number): IOptionHandleResult;
}
export declare class ArgOptionHandler extends OptionConstructor {
    constructor(opts: IOptionSetting);
    handle(args: string[], current: number): IOptionHandleResult;
}
