/**
 *  Copyright 2020 Angus.Fenying <fenying@litert.org>
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

import * as $Exceptions from '@litert/exception';

export const errorRegistry = $Exceptions.createExceptionRegistry({
    'module': 'clap.litert.org',
    'types': {
        'public': {
            'index': $Exceptions.createIncreaseCodeIndex(1)
        }
    }
});

export const E_DUP_COMMAND_NAME = errorRegistry.register({
    name: 'dup_command_name',
    message: 'The name of command has been used already.',
    metadata: {},
    type: 'public'
});

export const E_DUP_COMMAND_ALIAS = errorRegistry.register({
    name: 'dup_command_alias',
    message: 'The alias of command has been used already.',
    metadata: {},
    type: 'public'
});

/**
 * The command specified by path doesn't exist.
 */
export const E_COMMAND_NOT_FOUND_BY_PATH = errorRegistry.register({
    name: 'command_not_found_by_path',
    message: 'The command specified by path doesn\'t exist.',
    metadata: {},
    type: 'public'
});

export const E_INVALID_COMMAND_NAME = errorRegistry.register({
    name: 'invalid_command_name',
    message: 'The name of command is invalid.',
    metadata: {},
    type: 'public'
});

export const E_INVALID_COMMAND_ALIAS = errorRegistry.register({
    name: 'invalid_command_alias',
    message: 'The alias of command is invalid.',
    metadata: {},
    type: 'public'
});

export const E_INVALID_COMMAND_PATH = errorRegistry.register({
    name: 'invalid_command_path',
    message: 'The path of command is invalid.',
    metadata: {},
    type: 'public'
});

export const E_DUP_OPTION_NAME = errorRegistry.register({
    name: 'dup_option_name',
    message: 'The name of option has been used already.',
    metadata: {},
    type: 'public'
});

export const E_DUP_OPTION_SHORTCUT = errorRegistry.register({
    name: 'dup_option_shortcut',
    message: 'The name of option has been used already.',
    metadata: {},
    type: 'public'
});

export const E_INVALID_OPTION_NAME = errorRegistry.register({
    name: 'invalid_option_name',
    message: 'The name of option is invalid.',
    metadata: {},
    type: 'public'
});

export const E_INVALID_OPTION_SHORTCUT = errorRegistry.register({
    name: 'invalid_option_shortcut',
    message: 'The shortcut of option is invalid.',
    metadata: {},
    type: 'public'
});

export const E_INCORRECT_OPTION_SHORTCUT_USAGE = errorRegistry.register({
    name: 'incorrect_option_shortcut_usage',
    message: 'The option must be the last one in shortcut mixs usage.',
    metadata: {},
    type: 'public'
});

export const E_EXPECT_OPTION_ARGUMENT = errorRegistry.register({
    name: 'expect_option_argument',
    message: 'Missing the argument of an option.',
    metadata: {},
    type: 'public'
});

export const E_UNKNOWN_COMMAND = errorRegistry.register({
    name: 'unknown_command',
    message: 'The command doesn\'t exist.',
    metadata: {},
    type: 'public'
});

export const E_TOO_MANY_ARGUMENTS = errorRegistry.register({
    name: 'too_many_arguments',
    message: 'Too many arguments for the option.',
    metadata: {},
    type: 'public'
});

export const E_NO_ENOUGH_ARGUMENTS = errorRegistry.register({
    name: 'no_enough_arguments',
    message: 'The quantity of arguments is not enough.',
    metadata: {},
    type: 'public'
});

export const E_COMMAND_EXPECTED = errorRegistry.register({
    name: 'command_expected',
    message: 'Missing command or sub command.',
    metadata: {},
    type: 'public'
});

export const E_CONFLICT_CONFIG = errorRegistry.register({
    name: 'conflict_config',
    message: 'The configuration is invalid because it\'s conflicted.',
    metadata: {},
    type: 'public'
});
