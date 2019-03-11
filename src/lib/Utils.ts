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
