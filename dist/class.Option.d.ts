/**
 * Following types of options are supported.
 *
 * 1. Without argument
 *   -v (--version), -rf (--recursive --force)
 * 2. With argument
 *   -f a.txt (--file a.txt)
 *   -o=a.txt (--output=a.txt)
 *   -oa.txt (--output=a.txt)
 */
import { IDictionary } from "@litert/core";
export interface IOptionSetting {
    "name": string;
    "description": string;
    "argPlaceholders"?: string[];
    "shortName"?: string;
    "required"?: boolean;
    "multi"?: boolean;
}
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
