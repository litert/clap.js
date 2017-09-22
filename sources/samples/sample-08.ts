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

let parser = Clap.createCommandParser();

parser.addOption({

    "name": "name",
    "description": "Determine the name to be activated.",
    "shortcut": "n",
    "withArgument": true
});

parser.addCommand({
    "name": "help",
    "description": "Help command."
});

parser.addCommand({
    "name": "activate",
    "description": "Activate command."
});

parser.addSubCommand("activate", {
    "name": "game",
    "description": "Activate a game."
}).addSubCommand("activate", {
    "name": "system",
    "description": "Activate a system."
}).addSubCommand("activate", {
    "name": "account",
    "description": "Activate an account."
});

parser.addCommand({
    "name": "deactivate",
    "description": "Deactivate command."
});

parser.addSubCommand("deactivate", {
    "name": "game",
    "description": "Deactivate a game."
}).addSubCommand("deactivate", {
    "name": "system",
    "description": "Deactivate a system."
}).addSubCommand("deactivate", {
    "name": "account",
    "description": "Deactivate an account."
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    switch (result.mainCommand) {
    case "help":

        console.log("Help command is found.");
        break;

    case "activate":

        switch (result.subCommand) {

        case "system":
            console.info("Activating system...");
            break;
        case "game":
            console.info("Activating game...");
            break;
        case "account":
            console.info("Activating account...");
            break;
        }
        console.info("Activation completed.");
        break;
    case "deactivate":
        switch (result.subCommand) {

        case "system":
            console.info("Deactivate system...");
            break;
        case "game":
            console.info("Deactivate game...");
            break;
        case "account":
            console.info("Deactivate account...");
            break;
        }
        console.info("Deactivation completed.");
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
