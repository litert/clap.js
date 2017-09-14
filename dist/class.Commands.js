"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@litert/core");
const Errors = require("./errors");
class MainCommand {
    constructor(opts) {
        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
        if (this.shortName !== undefined && !this.shortName.match(/^[a-z0-9]$/)) {
            throw new core_1.Exception(Errors.E_INVALID_SHORT_COMMAND, `Short name of command "${opts.name}" must be a single charactor.`);
        }
        this._subCommands = {};
    }
    addSubCommand(opts) {
        this._subCommands[opts.name] = new SubCommandOption(opts);
        if (opts.shortName) {
            this._subCommands[opts.shortName] = this._subCommands[opts.name];
        }
        this.enableSubCommand = true;
        return this;
    }
    findSubCommand(name) {
        return this.enableSubCommand ? this._subCommands[name] : undefined;
    }
}
exports.MainCommand = MainCommand;
class SubCommandOption {
    constructor(opts) {
        this.name = opts.name;
        this.description = opts.description;
        this.shortName = opts.shortName;
    }
}
//# sourceMappingURL=class.Commands.js.map