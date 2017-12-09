# 使用带命令的解析器

> [上一章：快速入门](./01-get-start.md) | [返回目录](./index.md)

在上一章节中，我们通过示例介绍了分析命令行选项的方法。在这一章节中，将介绍与
**命令（Command）**相关的操作。

## 1. 使用主命令

与解析命令行选项不同，要解析识别命令，则必须使用 CommandParser ，通过 Clap.js 的模块
导出方法 `Clap.createCommandParser` 创建一个 CommandParser 对象。

下面看示例代码 sample-07.ts，这段代码创建了一个命令解析器，可以解析 help 命令和 go
命令，以及一个 --input 选项。

> 注意：
>
> 1. 命令名称是不区分大小写的。
> 2. 命令名称只能包含 `[-a-zA-Z0-9]`，且必须以字母或者数字开头，至少两个字符。

```ts
// File: sources/samples/sample-07.ts
import * as Clap from "@litert/clap";

// 创建一个命令解析器
let parser = Clap.createCommandParser();

// 注册一个 --input 或 -i 选项
parser.addOption({

    "name": "input",
    "description": "Determine the input file.",
    "shortcut": "i",
    "withArgument": true
});

// 通过 CommandParser 类对象的 addCommand 方法注册方法

// 注册 help 主命令
parser.addCommand({
    "name": "help",
    "description": "Display the help info."
});

// 注册 go 主命令
parser.addCommand({
    "name": "go",
    "description": "The go command."
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    // 主命令通过结果集的 mainCommand 字段读取。
    switch (result.mainCommand) {
    case "help":
        console.info("Help command is found.");
        break;
    case "go":
        console.info("Go command is found.");
        break;
    }

    if (result.existOption("input")) {

        console.info(`Input: ${result.getOption("input")}`);
    }

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
```

然后测试：

```sh
$ node dist/samples/sample-07.js help
Help command is found.

$ node dist/samples/sample-07.js go
Go command is found.

$ node dist/samples/sample-07.js help --input test.txt
Help command is found.
Input: test.txt

$ node dist/samples/sample-07.js --input test.txt
Input: test.txt
```

使用命令解析器时，必须输入命令，否则会返回错误。

## 2. 使用子命令

子命令是指主命令后面再跟一个命令，注册子命令必须先注册对于的主命令，然后
通过 CommandParser 类对象的 addSubCommand 方法注册子命令。

> 如果为一个主命令指定了子命令，则必须主命令和子命令一起使用，否则将返回
> 错误。

```ts
// File: sources/samples/sample-08.ts
import * as Clap from "@litert/clap";

let parser = Clap.createCommandParser();

parser.addOption({

    "name": "name",
    "description": "Determine the name to be activated.",
    "shortcut": "n",
    "withArgument": true
});

// 注册主命令 help 
parser.addCommand({
    "name": "help",
    "description": "Help command."
});

// 注册主命令 activate
parser.addCommand({
    "name": "activate",
    "description": "Activate command."
});

// 注册主命令 activate 的子命令
parser.addSubCommand("activate", {
    "name": "game",
    "description": "Activate a game."
}).addSubCommand("activate", {
    "name": "system",
    "description": "Activate a system."
}).addSubCommand("activate", {
    "name": "account",
    "description": "Activate an account."
});

// 注册主命令 deactivate
parser.addCommand({
    "name": "deactivate",
    "description": "Deactivate command."
});

// 注册主命令 deactivate 的子命令
parser.addSubCommand("deactivate", {
    "name": "game",
    "description": "Deactivate a game."
}).addSubCommand("deactivate", {
    "name": "system",
    "description": "Deactivate a system."
}).addSubCommand("deactivate", {
    "name": "account",
    "description": "Deactivate an account."
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    switch (result.mainCommand) {
    case "help":

        console.log("Help command is found.");
        break;

    case "activate":

        switch (result.subCommand) {

        case "system":
            console.info("Activating system...");
            break;
        case "game":
            console.info("Activating game...");
            break;
        case "account":
            console.info("Activating account...");
            break;
        }
        console.info("Activation completed.");
        break;
    case "deactivate":
        switch (result.subCommand) {

        case "system":
            console.info("Deactivate system...");
            break;
        case "game":
            console.info("Deactivate game...");
            break;
        case "account":
            console.info("Deactivate account...");
            break;
        }
        console.info("Deactivation completed.");
        break;
    }

    if (result.existOption("input")) {

        console.info(`Input: ${result.getOption("input")}`);
    }

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
```

执行测试：

```sh
$ node dist/samples/sample-08.js activate game -n abc
Activating game...
Activation completed.

$ node dist/samples/sample-08.js activate system -n abc
Activating system...
Activation completed.

$ node dist/samples/sample-08.js activate account -n abc
Activating account...
Activation completed.

$ node dist/samples/sample-08.js deactivate account -n abc
Deactivate account...
Deactivation completed.

$ node dist/samples/sample-08.js deactivate system -n abc
Deactivate system...
Deactivation completed.

$ node dist/samples/sample-08.js deactivate game -n abc
Deactivate game...
Deactivation completed.

$ node dist/samples/sample-08.js help
Help command is found.

$ node dist/samples/sample-08.js deactivate -n abc
Exception { _errno: 8, _message: 'No sub command input.' }
```

## 3. 使用命令简写式

命令简写式，是指使用一个字母代替命令完整名称的方法。

> 比如 NPM 可以用 `npm i` 代替 `npm install`。

Clap.js 统一支持命令的简写式，只需要在注册命令时加一个 `shortcut` 字段即可。命令
简写式与选项简写式相似，都只能用一个字母表示。

**注意：与命令名称不同，简写式是区分大小写的。**

```ts
// File: sources/samples/sample-09.ts
import * as Clap from "@litert/clap";

let parser = Clap.createCommandParser();

parser.addOption({

    "name": "name",
    "description": "Determine the name to be activated.",
    "shortcut": "n",
    "withArgument": true
});

// 注册主命令 help 
parser.addCommand({
    "name": "help",
    "description": "Help command."
});

// 注册主命令 activate
parser.addCommand({
    "name": "activate",
    "shortcut": "a", // 设置 a 为 activate 的简写式
    "description": "Activate command."
});

// 注册主命令 activate 的子命令
parser.addSubCommand("activate", {
    "name": "game",
    "description": "Activate a game."
}).addSubCommand("activate", {
    "name": "system",
    "description": "Activate a system."
}).addSubCommand("activate", {
    "name": "account",
    "description": "Activate an account."
});

// 注册主命令 deactivate
parser.addCommand({
    "name": "deactivate",
    "shortcut": "d", // 设置 d 为 deactivate 的简写式
    "description": "Deactivate command."
});

// 注册主命令 deactivate 的子命令
parser.addSubCommand("deactivate", {
    "name": "game",
    "description": "Deactivate a game."
}).addSubCommand("deactivate", {
    "name": "system",
    "description": "Deactivate a system."
}).addSubCommand("deactivate", {
    "name": "account",
    "description": "Deactivate an account."
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    switch (result.mainCommand) {
    case "help":

        console.log("Help command is found.");
        break;

    case "activate":

        switch (result.subCommand) {

        case "system":
            console.info("Activating system...");
            break;
        case "game":
            console.info("Activating game...");
            break;
        case "account":
            console.info("Activating account...");
            break;
        }
        console.info("Activation completed.");
        break;
    case "deactivate":
        switch (result.subCommand) {

        case "system":
            console.info("Deactivate system...");
            break;
        case "game":
            console.info("Deactivate game...");
            break;
        case "account":
            console.info("Deactivate account...");
            break;
        }
        console.info("Deactivation completed.");
        break;
    }

    if (result.existOption("input")) {

        console.info(`Input: ${result.getOption("input")}`);
    }

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
```

执行测试：

```sh
$ node dist/samples/sample-08.js activate game -n abc
Activating game...
Activation completed.

$ node dist/samples/sample-08.js a system -n abc
Activating system...
Activation completed.

$ node dist/samples/sample-08.js a account -n abc
Activating account...
Activation completed.

$ node dist/samples/sample-08.js deactivate account -n abc
Deactivate account...
Deactivation completed.

$ node dist/samples/sample-08.js d system -n abc
Deactivate system...
Deactivation completed.

$ node dist/samples/sample-08.js d game -n abc
Deactivate game...
Deactivation completed.

$ node dist/samples/sample-08.js help
Help command is found.

$ node dist/samples/sample-08.js d -n abc
Exception { _errno: 8, _message: 'No sub command input.' }
```

此外，不止是主命令可以用简写式，子命令也可以用简写式，使用方法同理。

> [下一章：模块接口](./A.module-api.md) | [返回目录](./index.md)
