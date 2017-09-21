"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Cmd = require("./class.CommandParser");
const Simple = require("./class.SimpleParser");
exports.Errors = require("./errors");
function createCommandParser(opts) {
    return new Cmd.CommandParser(opts);
}
exports.createCommandParser = createCommandParser;
function createSimpleParser(opts) {
    return new Simple.SimpleParser(opts);
}
exports.createSimpleParser = createSimpleParser;
//# sourceMappingURL=index.js.map