import * as External from "./interfaces";
import * as Internal from "./internal";
declare class Option implements Internal.IOption {
    name: string;
    description: string;
    withArgument: boolean;
    defaultArgument: string;
    shortcut?: string;
    repeatable?: boolean;
    constructor(opts: External.IOptionSetting);
    isInput(): boolean;
    isOptionalInput(): boolean;
    isFlag(): boolean;
}
export = Option;
