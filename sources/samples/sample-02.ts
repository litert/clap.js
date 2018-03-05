/*
   +----------------------------------------------------------------------+
   | LiteRT Clap.js Library                                               |
   +----------------------------------------------------------------------+
   | Copyright (c) 2018 Fenying Studio                                    |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/clap.js/blob/master/LICENSE                |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <fenying@litert.org>                          |
   +----------------------------------------------------------------------+
 */

/* tslint:disable:no-console no-unused-expression */

import * as Clap from "../index";

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "output",
    "description": "Determine the path to the output file.",
    "shortcut": "o",
    "withArgument": true
});

let result = parser.parse(process.argv.slice(2));

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
