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

import { IDictionary, Exception } from "@litert/core";

export interface IOptionSetting {

    /**
     * Determine the name of option, in case-insensitive.
     */
    "name": string;

    /**
     * The description of this option, and it will be display in help.
     */
    "description": string;

    /**
     * Set the placeholder of option arguments.
     *
     * Leave blank of an empty array if no arguments are required.
     */
    "argPlaceholders"?: string[];

    /**
     * Set the shortcut of this option. e.g. use i as shortcut of include.
     *
     * Notice:
     *
     *  1. Only one charactor shortcut is allowed.
     *  2. Short name is case-sensitive.
     */
    "shortName"?: string;

    /**
     * Set to true to determine this option is required.
     */
    "required"?: boolean;

    /**
     * Determine whether the option should and could be used repeadedly.
     */
    "multi"?: boolean;
}

export interface IParseResult {

    /**
     * Detect if commandline arguments are parsed successfully.
     */
    "success": boolean;

    /**
     * The error info when failed to parse.
     */
    "error"?: Exception;

    /**
     * Get list of names of all found options.
     */
    "optionNames": string[];

    /**
     * How many options are found.
     */
    "optionCount": number;

    /**
     * How many arguments found.
     */
    "argumentCount": number;

    /**
     * Get list of all arguments found.
     */
    "arguments": string[];

    /**
     * Check if an option is set.
     */
    existOption(name: string): boolean;

    /**
     * Check if an option is multi set.
     */
    isMultiOption(name: string): boolean;

    /**
     * Check how many times an option is set.
     */
    countOption(name: string): number;

    /**
     * Get arguments list of option by index.
     */
    getOption(name: string, index?: number): IDictionary<string>;

    /**
     * The the value of argument by index.
     */
    getArgument(index: number): string;
}

export interface ICommandParseResult extends IParseResult {

    /**
     * The name of main command or the only command.
     */
    "mainCommand"?: string;

    /**
     * The name of sub command.
     */
    "subCommand"?: string;
}

export interface ISimpleParser {

    /**
     * Add a supported option to be parsed.
     */
    addOption(opts: IOptionSetting): ISimpleParser;

    /**
     * Do parse the commandline arguments.
     */
    parse(): IParseResult;
}

export interface ICommandSettings {

    /**
     * The name of command.
     *
     * Which is also the type in value from console to specify the command.
     *
     * This is case-insensitive.
     */
    "name": string;

    /**
     * The description for this command, to be display in help document.
     */
    "description": string;

    /**
     * The short name of command, such as using i as the shortcut of install
     * like the way NPM works.
     */
    "shortName"?: string;
}

export interface ICommandParser extends ISimpleParser {

    /**
     * Add a new supported command to be parsed.
     */
    addCommand(opts: ICommandSettings): ICommandParser;

    /**
     * Add a new sub command for an existed command, to be parsed.
     */
    addSubCommand(
        main: string,
        opts: ICommandSettings
    ): ICommandParser;

    /**
     * Do parse the commandline arguments.
     */
    parse(): ICommandParseResult;
}
