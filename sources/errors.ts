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

/**
 * Shortcut of option must a single alphabet or digtal charactor.
 */
export const E_INVALID_SHORT_OPTION: number = 0x0001;

/**
 * Lack argument of an option.
 */
export const E_LACK_OPTION_ARG: number = 0x0002;

/**
 * Only flag option can be compacted.
 */
export const E_FORBIDDEN_COMPACT: number = 0x0003;

/**
 * The main command does not exist.
 */
export const E_INVALID_MAIN_COMMAND: number = 0x0004;

/**
 * The sub command does not exist.
 */
export const E_INVALID_SUB_COMMAND: number = 0x0005;

/**
 * Shortcut of command must a single alphabet or digtal charactor.
 */
export const E_INVALID_SHORT_COMMAND: number = 0x0006;

/**
 * Main command not found form input.
 */
export const E_LACK_MAIN_COMMAND: number = 0x0007;

/**
 * Sub command not found form input.
 */
export const E_LACK_SUB_COMMAND: number = 0x0008;

/**
 * Only argument-option can be use in assign mode.
 */
export const E_FORBIDDEN_ASSIGN: number = 0x0009;

/**
 * Attach mode is not enabled.
 */
export const E_FORBIDDEN_ATTACH: number = 0x000A;

/**
 * Cannot assign a value to a flag option.
 */
export const E_ASSIGN_TO_FLAG: number = 0x000B;

/**
 * The main command already exists.
 */
export const E_DUPLICATED_MAIN_COMMAND: number = 0x000C;

/**
 * The sub command already exists.
 */
export const E_DUPLICATED_SUB_COMMAND: number = 0x000D;

/**
 * The shortcut of sub command already exists.
 */
export const E_DUPLICATED_SUB_SHORTCUT: number = 0x000E;

/**
 * The shortcut of main command already exists.
 */
export const E_DUPLICATED_MAIN_SHORTCUT: number = 0x000F;
