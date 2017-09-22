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
const LibClap = require("./");
let parser = LibClap.createCommandParser();
parser.addOption({
    "name": "file",
    "shortcut": "f",
    "description": "The file to be handled.",
    "withArgument": true,
    "repeatable": true
}).addOption({
    "name": "output",
    "shortcut": "o",
    "description": "The path to output result.",
    "withArgument": true
}).addOption({
    "name": "overwrite",
    "description": "Overwrite existing output file."
});
parser.addCommand({
    "name": "activate",
    "description": "Activate the item.",
    "shortcut": "a"
}).addCommand({
    "name": "deactivate",
    "description": "Activate the item.",
    "shortcut": "d"
}).addSubCommand("activate", {
    "name": "game",
    "description": "Activate a game."
}).addSubCommand("activate", {
    "name": "song",
    "description": "Activate a song."
}).addSubCommand("activate", {
    "name": "my-account",
    "description": "Activate a song."
}).addSubCommand("deactivate", {
    "name": "game",
    "description": "Activate a game."
}).addSubCommand("deactivate", {
    "name": "song",
    "description": "Activate a song."
}).addCommand({
    "name": "help",
    "description": "Print the help info."
}).addCommand({
    "name": "Version",
    "description": "Print the version of application."
});
let clap = parser.parse();
console.info(JSON.stringify(clap, null, 4));
//# sourceMappingURL=test-command.js.map