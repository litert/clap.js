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

parser.addOption({

    "name": "go",
    "description": "This is a flag go",
    "arguments": 0

}).addOption({

    "name": "file",
    "description": "This is a option file",
    "shortcut": "f",
    "argumentName": "PATH"

}).addOption({

    "name": "out",
    "description": "This is a option out",
    "shortcut": "o",
    "arguments": 1

}).addOption({

    "name": "this-is-a-long-test-option-item-yes",
    "description": "This is a option out",
    "shortcut": "t",
    "arguments": 1

});

const parseResult = parser.parse([
    "-p=123", "--go", "-f=123", "-faaa", "-f", "faaa", "-o", "hello", "hey"
]);

console.log(JSON.stringify(parseResult, null, 2));

console.log(parser.generateHelp("test", parseResult.help).join("\n"));

try {

    parser.parse([
        "-p=123", "--go", "-f=123", "-faaa", "-f", "faaa", "-o", "hello", "-o", "dd"
    ]);
}
catch (e) {

    if (e instanceof LibCLAP.E_TOO_MANY_ARGUMENTS) {

        console.error(`ERROR CAUGHT: Too many argumetns for option '${e.metadata.optionName}'.`);
    }
    else {

        console.error(`Unexpected error: ${e.message}`);
    }
}
