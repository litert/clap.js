/**
 *  Copyright 2021 Angus.Fenying <fenying@litert.org>
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

import * as $Clap from '../lib';

const parser = $Clap.createHelper({
    title: 'Test Docker Command Arguments',
    command: 'docker',
    description: 'This is a demo of clap.js with docker command.',
    languagePackage: {
        ...$Clap.ENGLISH_LANG_PACKAGE,
        'flags:port:argument': 'port',
        'flags:volume:argument': 'volume',
    }
});

parser
    .addOption({
        'name': 'name',
        'shortcut': 'n',
        'description': 'The name of container.'
    })
    .addOption({
        'name': 'port',
        'shortcut': 'p',
        'description': 'The ports mapping.',
        'multiple': true
    })
    .addOption({
        'name': 'volume',
        'shortcut': 'v',
        'description': 'The volume mapping.',
        'multiple': true
    })
    .addFlag({
        'name': 'daemon',
        'shortcut': 'd',
        'description': 'Run as daemon mode.'
    })
    .addFlag({
        'name': 'terminal',
        'shortcut': 't',
        'description': 'Run as terminal mode.'
    })
    .addFlag({
        'name': 'interactive',
        'shortcut': 'i',
        'description': 'Run as interactive mode.'
    })
    .setMaxArguments(1)
    .setMinArguments(1);

function print(result: $Clap.IParseResult): void {

    console.log(JSON.stringify(result, null, 2));
}

print(parser.parse([
    'a'
]));

print(parser.parse([
    '-it', 'alpine:latest'
]));

print(parser.parse([
    '-it', '--name=test', 'alpine:latest'
]));

print(parser.parse([
    '-it', '--name', 'test', 'alpine:latest'
]));

print(parser.parse([
    '-it', '-ntest', 'alpine:latest'
]));

print(parser.parse([
    '-itn', 'test', 'alpine:latest', '--', 'sh'
]));

print(parser.parse([
    '-itd', '-p0.0.0.0:22:22', '-p0.0.0.0:80:80', '-v', '$PWD:/data', 'alpine:latest', 'sh'
]));

console.log(parser.generateHelp().join('\n'));
