/**
 *  Copyright 2023 Angus.Fenying <fenying@litert.org>
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
/**
 * The error class for Clap.
 */

export abstract class ClapError extends Error {

    public constructor(
        /**
         * The name of the error.
         */
        name: string,
        /**
         * The message of the error.
         */
        message: string,
        public readonly ctx: Record<string, unknown> = {},
        /**
         * The metadata of the error.
         */
        public readonly origin: unknown = null
    ) {

        super(message);
        this.name = name;
    }
}

export const E_NO_SUCH_COMMAND = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'no_such_command',
            'The command does not exist.',
            ctx,
            origin,
        );
    }
};

export const E_NO_SUCH_OPTION = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'no_such_option',
            'The option does not exist.',
            ctx,
            origin,
        );
    }
};

export const E_NO_SUCH_FLAG = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'no_such_flag',
            'The flag does not exist.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_OPTION_NAME = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_option_name',
            'The name of option has already been used.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_COMMAND_NAME = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_command_name',
            'The name of command has already been used.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_FLAG_NAME = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_flag_name',
            'The name of flag has already been used.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_OPTION_SHORTCUT = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_option_shortcut',
            'The shortcut of option has already been used.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_COMMAND_SHORTCUT = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_command_shortcut',
            'The shortcut of command has already been used.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_FLAG_SHORTCUT = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_flag_shortcut',
            'The shortcut of flag has already been used.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_OPTION_NAME = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_option_name',
            'The name of option is malformed.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_COMMAND_NAME = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_command_name',
            'The name of command is malformed.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_FLAG_NAME = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_flag_name',
            'The name of flag is malformed.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_OPTION_SHORTCUT = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_option_shortcut',
            'The shortcut of option is malformed.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_COMMAND_SHORTCUT = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_command_shortcut',
            'The shortcut of command is malformed.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_FLAG_SHORTCUT = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_flag_shortcut',
            'The shortcut of flag is malformed.',
            ctx,
            origin,
        );
    }
};

export const E_OPTION_VALUE_REQUIRED = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'option_value_required',
            'The value of option is required.',
            ctx,
            origin,
        );
    }
};

export const E_COMMAND_REQUIRED = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'command_required',
            'The command is required before arguments.',
            ctx,
            origin,
        );
    }
};

export const E_ARGUMENTS_LACKED = class extends ClapError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'arguments_lacked',
            'Too few arguments.',
            ctx,
            origin,
        );
    }
};
