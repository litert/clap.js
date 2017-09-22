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

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "Help",
    "description": "Display the help text.",
    "shortcut": "h"
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    if (result.existOption("help")) {

        console.info("This is help text");
        process.exit(0);
    }

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
