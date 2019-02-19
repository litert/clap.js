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

export interface ICommandSettings {

    /**
     * Specify the command-path if the command is a sub-command.
     */
    "path"?: string;

    /**
     * Specify the full command name.
     */
    "name": string;

    /**
     * The description about this command.
     *
     * This will be displayed in HELP information.
     */
    "description": string;

    /**
     * Specify a shortcut or alias for this command.
     */
    "alias"?: string | string[];
}

export interface IOptionSettings {

    /**
     * Specify the command-path if the option is for specific commands.
     */
    "path"?: string | string[];

    /**
     * Specify the full option name.
     */
    "name": string;

    /**
     * The description about this option.
     *
     * This will be displayed in HELP information.
     */
    "description": string;

    /**
     * Use a one-character shortcut for this option.
     *
     * **NOTICE: The shortcut is case-sensitive.**
     */
    "shortcut"?: string;

    /**
     * How many times this option could be repeatedly used to accept more
     * arguments.
     *
     * Set to -1 if unlimited, or set to 0 if this option is a flag.
     *
     * > A flag means no argument acceptable.
     *
     * @default -1
     */
    "arguments"?: number;
}

export interface ICommandResult {

    "name": string;

    "options": Record<string, string[]>;

    "flags": Record<string, boolean>;
}

export interface IResult {

    /**
     * The parsed commands.
     */
    "commands": ICommandResult[];

    /**
     * The parsed options.
     */
    "options": Record<string, string[]>;

    /**
     * The parsed flags.
     */
    "flags": Record<string, boolean>;

    /**
     * The parsed arguments.
     */
    "arguments": string[];
}

export interface IParser {

    /**
     * Add a new command for parsing.
     *
     * @param settings  The settings of the new command.
     */
    addCommand(settings: ICommandSettings): this;

    /**
     * Add a new option for parsing.
     *
     * @param settings  The settings of the new option.
     */
    addOption(settings: IOptionSettings): this;

    /**
     * Parse the input arguments.
     *
     * @returns A `IResult` will be returned when parsed successfully. If help
     * is handled by the parser, `false` will be returned. When error occurs,
     * an exception will be thrown.
     *
     * @example
     *
     * ```ts
     * parser.parse(process.argv.slice(2));
     * ```
     */
    parse(args: string[]): IResult | false;
}

export interface IParserConfig {

    /**
     * Generate help text.
     */
    "help": {

        /**
         * Display the HELP info for each command automatically.
         */
        "delegated": boolean;

        /**
         * Use command and sub-command `help`.
         *
         * @default true
         */
        "useCommand": boolean;

        /**
         * Use `-h` for shortcut.
         *
         * @default true
         */
        "shortFlag": boolean;

        /**
         * Use `--help` (or `-help` when `go` style).
         *
         * @default true
         */
        "longFlag": boolean;
    };

    /**
     * The settings about commands.
     */
    "commands": {

        /**
         * Specify the case-sensitive of commands.
         *
         * @default true
         */
        "caseSensitive": boolean;
    };

    /**
     * The settings about options.
     */
    "options": {

        /**
         * The options/flags after first argument will be treat as arguments.
         *
         * @default false
         */
        "notAfterArguments": boolean;

        /**
         * The style of options.
         *
         * - gnu        Use `-a` as shortcut and `--all` as long.
         * - windows    Use `/a` as shortcut and `/all` as long.
         * - go         Use `-a` as shortcut and `-all` as long (GNU traditional style).
         * - auto       Use `gnu` under *nix system and `windows` on windows system.
         */
        "style": "auto" | "gnu" | "windows" | "go";

        /**
         * The options for options shortcuts.
         */
        "shortcut": {

            /**
             * Allow assign an argument for an option in `-aARG` style or not.
             *
             * @default true
             */
            "attachArgument": boolean;

            /**
             * Allow assign an argument for an option in `-a=ARG` style or not.
             *
             * @default true
             */
            "assignArgument": boolean;

            /**
             * Allow assign an argument for an option in `-a ARG` style or not.
             *
             * @default true
             */
            "followArgument": boolean;

            /**
             * Allow mix shortcuts or not.
             *
             * @default true
             */
            "mix": boolean;
        };

        /**
         * The options for options shortcuts.
         */
        "long": {

            /**
             * Allow assign an argument for an option in `--add=ARG` style or not.
             *
             * @default true
             */
            "assignArgument": boolean;

            /**
             * Allow assign an argument for an option in `--add ARG` style or not.
             *
             * @default true
             */
            "followArgument": boolean;
        };
    };
}
