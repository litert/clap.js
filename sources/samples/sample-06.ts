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

/* tslint:disable:no-console */

import * as Clap from "../index";

let parser = Clap.createSimpleParser({
    "follow": false,
    "shortAttach": true,
    "fullAssign": true
});

parser.addOption({

    "name": "input",
    "description": "Determine the input file.",
    "shortcut": "i",
    "withArgument": true
});

let result = parser.parse();

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    if (result.existOption("input")) {

        console.info(`Input: ${result.getOption("input")}`);
    }

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
