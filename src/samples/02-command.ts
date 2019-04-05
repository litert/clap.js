/**
 *  Copyright 2019 Angus.Fenying <fenying@litert.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// tslint:disable: no-console

import * as LibCLAP from "../lib";

const parser = LibCLAP.createGNUParser();

parser.addCommand({

    "name": "configure",
    "description": "Configure a profile for the application manually.",
    "aliases": ["config"]

}).addCommand({

    "name": "api",
    "description": "Invoke specific API.",
    "aliases": ["a"]

}).addCommand({

    "name": "login",
    "description": "Log into the system before invoking APIs."

}).addCommand({

    "name": "Logout",
    "description": "Logout from the system."

}).addCommand({

    "name": "ping",
    "description": "Ping the system to check if it's connectable. If logged in, it will check the session availability."

}).addCommand({

    "name": "use",
    "description": "Select a profile for applicaton to use."

});

parser.addCommand({

    "path": "api",
    "name": "add-user",
    "description": "Add a new user."

}).addCommand({

    "path": "api",
    "name": "get-user",
    "description": "Read the profile of specifc user."

}).addCommand({

    "path": "api",
    "name": "del-user",
    "description": "Delete specifc user."

});

parser.addOption({
    "name": "username",
    "description": "Specify the username of user to be operated.",
    "shortcut": "u",
    "path": ["api.get-user", "api.add-user", "login"]
});

parser.addOption({
    "name": "password",
    "description": "Specify the username of user to be operated.",
    "shortcut": "p",
    "path": ["api.get-user", "api.add-user", "login"]
});

console.log(JSON.stringify(
    parser.parse([
        "help", "login", "-u=fenying", "-p=helloworld!", "-vcfff",
        "--", "--username=fff", "--ccc=12313", "this is a test"
    ]),
    null,
    2
));

console.log(parser.generateHelp("test", "api.add-user").join("\n"));

console.log(parser.generateHelp("test", "").join("\n"));
