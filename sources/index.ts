/*
   +----------------------------------------------------------------------+
   | LiteRT Clap.js Library                                               |
   +----------------------------------------------------------------------+
   | Copyright (c) 2007-2017 Fenying Studio                               |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/clap.js/blob/master/LICENSE                |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <i.am.x.fenying@gmail.com>                    |
   +----------------------------------------------------------------------+
 */

import * as Cmd from "./class.CommandParser";
import * as Simple from "./class.SimpleParser";
export * from "./interfaces";
import * as Def from "./interfaces";
export import Errors = require("./errors");
export * from "./class.Exception";

export function createCommandParser(opts?: Def.IParserSettings): Def.ICommandParser {

    return new Cmd.CommandParser(opts);
}

export function createSimpleParser(opts?: Def.IParserSettings): Def.ISimpleParser {

    return new Simple.SimpleParser(opts);
}
