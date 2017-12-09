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

import Exception from "./class.Exception";

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
     * Determine whether this option requires a argument.
     *
     * Default: false
     */
    "withArgument"?: boolean;

    /**
     * Set the default value for argument of this option.
     *
     * Only if withArgument is set to true, this field is available.
     *
     * Default: null
     */
    "defaultArgument"?: string;

    /**
     * Set the shortcut of this option. e.g. use i as shortcut of include.
     *
     * Notice:
     *
     *  1. Only one charactor shortcut is allowed.
     *  2. Shortcut is case-sensitive.
     */
    "shortcut"?: string;

    /**
     * Determine whether the option should and could be used repeadedly.
     */
    "repeatable"?: boolean;
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
     * Get list of all arguments found.
     */
    "arguments": string[];

    /**
     * Get list of all arguments found.
     */
    "unknwonOptions": string[];

    /**
     * Check if an option is set.
     */
    existOption(name: string): boolean;

    /**
     * Check if an option is multi set.
     */
    isOptionRepeated(name: string): boolean;

    /**
     * Check how many times an option is set.
     */
    getOptionLength(name: string): number;

    /**
     * Get arguments list of option by index.
     */
    getOption(name: string, index?: number): string;
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
    addOption(opts: IOptionSetting): this;

    /**
     * Do parse the commandline arguments.
     */
    parse(cmdArgs: string[]): IParseResult;
}

export interface ICommandSettings {

    /**
     * The name of command.
     *
     * Which is also the type in value from console to specify the command.
     *
     * This is case-insensitive.
     *
     * Format: ^[a-z0-9A-Z][-\w]+$
     */
    "name": string;

    /**
     * The description for this command, to be display in help document.
     */
    "description": string;

    /**
     * The shortcut of command, such as using i as the shortcut of install
     * like the way NPM works.
     *
     * > Shortcut of command is case-sensitive.
     *
     * Format: ^[A-Za-z]$
     */
    "shortcut"?: string;
}

export interface ICommandParser extends ISimpleParser {

    /**
     * Add a new supported command to be parsed.
     */
    addCommand(opts: ICommandSettings): this;

    /**
     * Add a new sub command for an existed command, to be parsed.
     */
    addSubCommand(
        main: string,
        opts: ICommandSettings
    ): this;

    /**
     * Do parse the commandline arguments.
     */
    parse(cmdArgs: string[]): ICommandParseResult;
}

export interface IParserSettings {

    /**
     * Enable "-x arg1 arg2 .." or "--Xxx arg1 arg2 ..."
     *
     * Default: true
     */
    "follow"?: boolean;

    /**
     * Enable "--Xxx=arg2"
     *
     * Default: false
     */
    "fullAssign"?: boolean;

    /**
     * Enable "-x=arg1"
     *
     * Default: false
     */
    "shortAssign"?: boolean;

    /**
     * Enable "-xarg1"
     *
     * Default: false
     */
    "shortAttach"?: boolean;

    /**
     * Enable use options only, without command.
     *
     * Default: true
     */
    "allowOptionsOnly"?: boolean;
}
