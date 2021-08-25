/* eslint-disable max-len */
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
        'cmd:network:create:arguments': '<network-name>'
    }
});

parser
    .addCommand({
        name: 'run',
        description: 'Start a new container.'
    })
    .with('run', (cmdRun) => cmdRun
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
        .setMinArguments(1)
    )
    .addCommand({
        'name': 'network',
        'description': 'Manage network resources.'
    })
    .with('network', (cmdNetwork) => cmdNetwork
        .addCommand({
            'name': 'create',
            'description': 'Create a new network'
        })
        .with('create', (cmdNetworkCreate) => cmdNetworkCreate
            .addOption({
                'name': 'driver',
                'description': 'The driver of new network'
            })
            .setMinArguments(1)
            .setMaxArguments(1)
        )
        .addCommand({
            'name': 'list',
            'shortcut': 'ls',
            'description': 'List all networks.'
        })
        .addCommand({
            'name': 'delete',
            'shortcut': 'rm',
            'description': 'Delete given networks.'
        })
        .with('delete', (cmdNetworkDelete) => cmdNetworkDelete
            .setMinArguments(1)
            .setMaxArguments(1)
        )
    );

function print(result: $Clap.IParseResult): void {

    console.log(JSON.stringify(result, null, 2));
}

if (process.argv.length > 2) {

    // print(parser.parse(process.argv.slice(2)));
    console.log(parser.generateHelp(parser.parse(process.argv.slice(2))).join('\n'));
    process.exit(0);
}

print(parser.parse([
    'run', 'a'
]));

print(parser.parse([
    'run', '-it', 'alpine:latest'
]));

print(parser.parse([
    'run', '-it', '--name=test', 'alpine:latest'
]));

print(parser.parse([
    'run', '-it', '--name', 'test', 'alpine:latest'
]));

print(parser.parse([
    'run', '-it', '-ntest', 'alpine:latest'
]));

print(parser.parse([
    'run', '-itn', 'test', 'alpine:latest', '--', 'sh'
]));

print(parser.parse([
    'run', '-itd', '-p0.0.0.0:22:22', '-p0.0.0.0:80:80', '-v', '$PWD:/data', 'alpine:latest', 'sh'
]));

print(parser.parse([
    'network', 'create', 'my-network', '--driver=bridge'
]));
