/* tslint:disable:no-console */

import * as LibClap from "./";

let parser: LibClap.SimpleParser = new LibClap.SimpleParser();

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

let clap: LibClap.IParseResult = parser.parse();

console.info(JSON.stringify(clap, null, 4));
