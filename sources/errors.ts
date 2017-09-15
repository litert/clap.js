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
 * Short name of option must a single alphabet or digtal charactor.
 */
export const E_INVALID_SHORT_OPTION: number = 0x0001;

/**
 * Lack argument of an option.
 */
export const E_LACK_OPTION_ARG: number = 0x0002;

/**
 * Some required option is not found from input.
 */
export const E_LACK_OPTION: number = 0x0003;

/**
 * The main command does not exist.
 */
export const E_INVALID_MAIN_COMMAND: number = 0x0004;

/**
 * The sub command does not exist.
 */
export const E_INVALID_SUB_COMMAND: number = 0x0005;

/**
 * Short name of command must a single alphabet or digtal charactor.
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
