#!node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LibClap = require("./");
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
let clap = parser.parse();
console.info(JSON.stringify(clap, null, 4));
//# sourceMappingURL=test.js.map