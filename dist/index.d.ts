export * from "./interfaces";
import * as Def from "./interfaces";
export import Errors = require("./errors");
export declare function createCommandParser(opts?: Def.IParserSettings): Def.ICommandParser;
export declare function createSimpleParser(opts?: Def.IParserSettings): Def.ISimpleParser;
