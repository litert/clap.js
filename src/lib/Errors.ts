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

import * as Core from '@litert/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorHub = Core.createErrorHub<Record<string, any>>('@litert/clap');

export const E_DUP_COMMAND_NAME = ErrorHub.define<Record<string, any>>(
    null,
    'E_DUP_COMMAND_NAME',
    'The name of command has been used already.',
    {}
);

export const E_DUP_COMMAND_ALIAS = ErrorHub.define<Record<string, any>>(
    null,
    'E_DUP_COMMAND_ALIAS',
    'The alias of command has been used already.',
    {}
);

/**
 * The command specified by path doesn't exist.
 */
export const E_COMMAND_NOT_FOUND_BY_PATH = ErrorHub.define<Record<string, any>>(
    null,
    'E_COMMAND_NOT_FOUND_BY_PATH',
    'The command specified by path doesn\'t exist.',
    {}
);

export const E_INVALID_COMMAND_NAME = ErrorHub.define<Record<string, any>>(
    null,
    'E_INVALID_COMMAND_NAME',
    'The name of command is invalid.',
    {}
);

export const E_INVALID_COMMAND_ALIAS = ErrorHub.define<Record<string, any>>(
    null,
    'E_INVALID_COMMAND_ALIAS',
    'The alias of command is invalid.',
    {}
);

export const E_INVALID_COMMAND_PATH = ErrorHub.define<Record<string, any>>(
    null,
    'E_INVALID_COMMAND_PATH',
    'The path of command is invalid.',
    {}
);

export const E_DUP_OPTION_NAME = ErrorHub.define<Record<string, any>>(
    null,
    'E_DUP_OPTION_NAME',
    'The name of option has been used already.',
    {}
);

export const E_DUP_OPTION_SHORTCUT = ErrorHub.define<Record<string, any>>(
    null,
    'E_DUP_OPTION_SHORTCUT',
    'The name of option has been used already.',
    {}
);

export const E_INVALID_OPTION_NAME = ErrorHub.define<Record<string, any>>(
    null,
    'E_INVALID_OPTION_NAME',
    'The name of option is invalid.',
    {}
);

export const E_INVALID_OPTION_SHORTCUT = ErrorHub.define<Record<string, any>>(
    null,
    'E_INVALID_OPTION_SHORTCUT',
    'The shortcut of option is invalid.',
    {}
);

export const E_INCORRECT_OPTION_SHORTCUT_USAGE = ErrorHub.define<Record<string, any>>(
    null,
    'E_INCORRECT_OPTION_SHORTCUT_USAGE',
    'The option must be the last one in shortcut mixs usage.',
    {}
);

export const E_EXPECT_OPTION_ARGUMENT = ErrorHub.define<Record<string, any>>(
    null,
    'E_EXPECT_OPTION_ARGUMENT',
    'Missing the argument of an option.',
    {}
);

export const E_UNKNOWN_COMMAND = ErrorHub.define<Record<string, any>>(
    null,
    'E_UNKNOWN_COMMAND',
    'The command doesn\'t exist.',
    {}
);

export const E_TOO_MANY_ARGUMENTS = ErrorHub.define<Record<string, any>>(
    null,
    'E_TOO_MANY_ARGUMENTS',
    'Too many arguments for the option.',
    {}
);

export const E_NO_ENOUGH_ARGUMENTS = ErrorHub.define<Record<string, any>>(
    null,
    'E_NO_ENOUGH_ARGUMENTS',
    'The quantity of arguments is not enough.',
    {}
);

export const E_COMMAND_EXPECTED = ErrorHub.define<Record<string, any>>(
    null,
    'E_COMMAND_EXPECTED',
    'Missing command or sub command.',
    {}
);

export const E_CONFLICT_CONFIG = ErrorHub.define<Record<string, any>>(
    null,
    'E_CONFLICT_CONFIG',
    'The configuration is invalid because it\'s conflicted.',
    {}
);
