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

import * as C from "./Common";

export function strSplit(
    str: string,
    delimiter: string,
    limit: number = -1
) {

    switch (limit) {
    case -1:
        return str.split(delimiter);
    case 0:
    case 1:
        return [str];
    }

    let tmp = str.split(delimiter);

    if (tmp.length <= limit) {

        return tmp;
    }

    tmp.splice(limit - 1, -1, tmp.splice(limit - 1).join(delimiter));

    return tmp;
}

export function deepDefault<T extends {}>(val: C.DeepPartial<T>, def: T): T {

    const ret: T = {} as any;

    for (const k in def) {

        if (val[k] === undefined) {

            ret[k] = def[k];
        }
        else if (typeof def[k] === "object") {

            ret[k] = def[k] === null ? def[k] : deepDefault(val[k] as any, def[k]);
        }
        else {

            ret[k] = val[k] as any;
        }
    }

    return ret;
}

export function dereplicate<T>(s: T[]): T[] {

    return Array.from(new Set(s));
}

export function calcCommandsAverageLength(cmds: string[]): number {

    const totalLength = cmds.reduce((p, v) => p + v.length, 0);

    return Math.ceil(totalLength / cmds.length);
}

export function findMaxLength(s: string[]): number {

    return s.reduce((p, v) => v.length > p ? v.length : p, 0);
}

export function indent(s: string, depth: number = 1): string {

    return `${"    ".repeat(depth)}${s}`;
}

/*
    setup, install, configure
                    Setup the application

    close
    kill
    remove
    shutdown
    stop            Stop the appliation

    clean           Clean up the application

*/

export function wrapLines(
    p: string,
    lineWidth: number,
    autoIndent: number = 0
): string[] {

    const lines = [];

    let l = "";

    for (const item of p.split(" ")) {

        let tmp: string;

        if (l) {

            tmp = l + " " + item;
        }
        else {

            tmp = item;
        }

        if (lineWidth < tmp.length) {

            lines.push(l);
            l = item;
        }
        else {

            l = tmp;
        }
    }

    lines.push(l);

    return autoIndent ?
        [lines[0], ...lines.slice(1).map((x) => indent(x, autoIndent))] :
        lines;
}
