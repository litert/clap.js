"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const LibClap = require("./");
let parser = new LibClap.CommandParser();
parser.addOption({
    "name": "file",
    "shortName": "f",
    "description": "The file to be handled.",
    "argPlaceholders": ["FILE"]
}).addOption({
    "name": "output",
    "shortName": "o",
    "description": "The path to output result.",
    "argPlaceholders": ["OUTPUT"]
}).addOption({
    "name": "overwrite",
    "description": "Overwrite existing output file."
});
parser.addCommand({
    "name": "activate",
    "description": "Activate the item.",
    "shortName": "a"
}).addCommand({
    "name": "deactivate",
    "description": "Activate the item.",
    "shortName": "d"
}).addSubCommand("activate", {
    "name": "game",
    "description": "Activate a game."
}).addSubCommand("activate", {
    "name": "song",
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