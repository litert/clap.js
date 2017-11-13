import * as Core from "@litert/core";
declare class Exception extends Core.Exception {
    constructor(error: number, message: string);
}
export = Exception;
