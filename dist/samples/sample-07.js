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
/* tslint:disable:no-console */
const Clap = require("../index");
let parser = Clap.createCommandParser();
parser.addOption({
    "name": "input",
    "description": "Determine the input file.",
    "shortcut": "i",
    "withArgument": true
});
parser.addCommand({
    "name": "help",
    "description": "Display the help info."
});
parser.addCommand({
    "name": "go",
    "description": "The go command."
});
let result = parser.parse(process.argv.slice(2));
for (let unknown of result.unknwonOptions) {
    console.log(`Unknown option: ${unknown}.`);
}
if (result.success) {
    switch (result.mainCommand) {
        case "help":
            console.info("Help command is found.");
            break;
        case "go":
            console.info("Go command is found.");
            break;
    }
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
//# sourceMappingURL=sample-07.js.map