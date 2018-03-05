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

/* tslint:disable:no-console */

import * as LibClap from "./";

let parser = LibClap.createSimpleParser({
    "shortAssign": true,
    "shortAttach": true
});

parser.addOption({
    "name": "file",
    "shortcut": "f",
    "description": "The file to be handled.",
    "withArgument": true
});

parser.addOption({
    "name": "output",
    "shortcut": "o",
    "description": "The path to output result.",
    "withArgument": true,
    "defaultArgument": "output.txt"
});

parser.addOption({
    "name": "include",
    "shortcut": "i",
    "description": "The extra files to be included.",
    "withArgument": true,
    "repeatable": true
});

parser.addOption({
    "name": "overwrite",
    "description": "Overwrite existing output file.",
    "shortcut": "w"
});

let clap: LibClap.IParseResult = parser.parse(process.argv.slice(2));

console.info(JSON.stringify(clap, null, 4));
