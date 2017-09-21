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
/* tslint:disable:no-console no-unused-expression */
const Clap = require("../index");
let parser = Clap.createSimpleParser();
parser.addOption({
    "name": "output",
    "description": "Determine the path to the output file.",
    "shortcut": "o",
    "withArgument": true
});
let result = parser.parse();
for (let unknown of result.unknwonOptions) {
    console.log(`Unknown option: ${unknown}.`);
}
if (result.success) {
    if (result.existOption("output")) {
        console.log(`Output File: ${result.getOption("output")}`);
    }
    else {
        console.log(`Output File: default.txt`);
    }
    for (let argv of result.arguments) {
        console.log(`Found Argument: ${argv}`);
    }
}
else {
    console.error(result.error);
}
//# sourceMappingURL=sample-02.js.map