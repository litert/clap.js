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
let parser = LibClap.createSimpleParser();
parser.addOption({
    "name": "file",
    "shortName": "f",
    "description": "The file to be handled.",
    "argPlaceholders": ["FILE"]
});
parser.addOption({
    "name": "output",
    "shortName": "o",
    "description": "The path to output result.",
    "argPlaceholders": ["OUTPUT"]
});
parser.addOption({
    "name": "include",
    "shortName": "i",
    "description": "The extra files to be included.",
    "argPlaceholders": ["FILE", "LINE"],
    "multi": true,
    "required": true
});
parser.addOption({
    "name": "overwrite",
    "description": "Overwrite existing output file."
});
let clap = parser.parse();
console.info(JSON.stringify(clap, null, 4));
//# sourceMappingURL=test.js.map