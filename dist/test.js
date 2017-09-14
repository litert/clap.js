"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const LibClap = require("./");
let parser = new LibClap.SimpleParser();
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