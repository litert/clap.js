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
    "shortName": "o",
    "argPlaceholders": ["FILE"]
});
parser.addOption({
    "name": "include",
    "description": "Add a path to include.",
    "shortName": "i",
    "argPlaceholders": ["PATH"],
    "multi": true
});
let result = parser.parse();
if (result.success) {
    if (result.existOption("output")) {
        console.log(`Output File: ${result.getOption("output").FILE}`);
    }
    else {
        console.log(`Output File: default.txt`);
    }
    if (result.existOption("include")) {
        for (let i = 0; i < result.countOption("include"); i++) {
            console.log(`Include: ${result.getOption("include", i).PATH}`);
        }
    }
    for (let argv of result.arguments) {
        console.log(`Found Argument: ${argv}`);
    }
}
else {
    console.error(result.error);
}
//# sourceMappingURL=sample-04.js.map