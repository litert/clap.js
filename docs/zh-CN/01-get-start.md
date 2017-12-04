# 快速入门

> [返回目录](./index.md)

## 1. 安装

通过 NPM 安装：

```sh
npm i @litert/clap--save
```

安装成功后，就可以开始用它处理命令行参数了，下面逐个看实例。

> 所有示例代码都在 sources/samples 目录下，以 sample-**.ts 格式命名

## 2. 使用 Clap.js 解析命令行选项

命令行中最常用的就是**选项（Option）**，也就是 `-x` 和 `--xxxx` 这样的选项。
本章节将介绍如何使用 Clap.js 解析命令行参数里面的选项。

一般只是解析命令行选项，则只需要使用 SimpleParser，可以通过 Clap.js 的模块导出方法
`Clap.createSimpleParser` 创建一个 SimpleParser 对象。

### 2.1. 标志选项基本用法

**标志选项**是指没有额外参数，仅需使用 -X 或者 --xxxx 作为开关的选项。

典型例子是 ls 命令的 -a 或者 -l 选项，这些选项没有附加参数，仅作为功能开关。

**注：shortcut 是选项/命令的简写形式，只能是单个字母，区分大小写。**

```ts
// File: sources/samples/sample-01.ts
import * as Clap from "@litert/clap";

// 创建一个简单解析器
let parser = Clap.createSimpleParser();

// 注册一个 --help 或者 -h 选项
parser.addOption({

    "name": "Help",
    "description": "Display the help text.",
    "shortcut": "h" // shortcut 是可选选项，即选项的简写式。
});

let result = parser.parse(process.argv.slice(2));

// 将无法识别的选项列举出来，通过 unknwonOptions 字段可以读取出来。
for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    /*
     * 检测命令行参数中是否使用了 help 选项。
     *
     * 此处需要注意：无论用 --help 还是 -h ，都只能用完整的选项名 help 来检测。
     *
     * 由于名称不区分大小写，所以必须用小写的 help 去检测。
     */
    if (result.existOption("help")) {

        console.info("This is help text");
        process.exit(0);
    }

    /**
     * 那些不被识别为选项或选项的参数的内容，被当成参数，可以通过 arguments
     * 字段读取出来。
     */
    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
```

通过命令行执行：

```sh
node dist/samples/sample-01.js --help
# 或者 
node dist/samples/sample-01.js -h
```

可以得到

```
$ node dist/samples/sample-01.js --help
This is help text
$ node dist/samples/sample-01.js -h
This is help text
```

> 注意 -h 和 -H 是不同的，因为选项简写式是区分大小写的，长选项名则不区分。

如果不使用 `--help` 或者 `-h`，比如：

```sh
node dist/samples/sample-01.js -H "hello world!" friend
```

则 `"hello world!"` 和 `friend` 会被当成参数，可以通过 `result.arguments` 属性读取
到。至于 `-H` 不被识别，会被通过 `result.unknownOptions`读取出来。例如上面这条命令可
以得到输出如下：

```
$ node dist/samples/sample-01.js -H "hello world!" friend
Unknown option: -H.
Found Argument: hello world!
Found Argument: friend
```

### 2.2. 带参数的选项实例

很多时候，还会用到**带参选项**，即选项需要一个参数，比如 `--input filename`。

```ts
// File: sources/samples/sample-02.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "output", // 配置一个 output 选项
    "description": "Determine the path to the output file.",
    "shortcut": "o",
    "withArgument": true // 指定 output 选项要求一个参数
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    if (result.existOption("output")) {

        /**
         * 通过 result.getOption 方法读取 output 选项的参数
         */
        console.log(`Output File: ${result.getOption("output")}`);
    }
    else {

        /**
         * 如果没输入 output 选项。
         */
        console.log(`Output File: default.txt`);
    }

    /**
     * 逐个打印剩余的参数。
     */
    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    /**
     * 由于指定了 output 选项必须有一个参数，所以如果没有检测到参数，则会报错。
     */
    console.error(result.error);
}
```

分别执行下面三条命令：

```sh
node dist/samples/sample-02.js input.txt
node dist/samples/sample-02.js --output target.txt input.txt
node dist/samples/sample-02.js input.txt --output
```

得到输出：

```
$ node dist/samples/sample-02.js input.txt
Output File: default.txt      # 没有使用 --output 选项
Found Argument: input.txt

$ node dist/samples/sample-02.js --output target.txt input.txt
Output File: target.txt
Found Argument: input.txt

$ node dist/samples/sample-02.js input.txt --output
Exception {                    # --output 缺少 FILE 参数，因此 parse 失败。
  _errno: 2,
  _message: 'Option "--output" requires an argument.' }
```

### 2.3. 选项简写式组合

对于多个标志选项的选项简写式 `-a`、`-b`、`-c` 可以简写为 `-abc`。

> 注意：带参数的选项的选项简写式不可以组合使用！

```ts
// File: sources/samples/sample-03.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "output",
    "description": "Determine the path to the output file.",
    "shortcut": "o",
    "withArgument": true
});

parser.addOption({

    "name": "alone", // 注册一个标志选项 alone
    "description": "just for test.",
    "shortcut": "a"
});

parser.addOption({

    "name": "detail", // 注册一个标志选项 detail
    "description": "just for test.",
    "shortcut": "d"
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    if (result.existOption("output")) {

        /**
         * 通过 result.getOption 方法读取 output 选项的参数。
         */
        console.log(`Output File: ${result.getOption("output")}`);
    }
    else {

        console.log(`Output File: default.txt`);
    }

    /**
     * 检测是否有 --alone 或者 -a
     */
    console.log(
        result.existOption("alone") ?
            `Alone Mode:  On` :
            `Alone Mode:  Off`
    );

    /**
     * 检测是否有 --detail 或者 -d
     */
    console.log(
        result.existOption("detail") ?
            `Detail Mode: On` :
            `Detail Mode: Off`
    );

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
```

尝试执行命令：

```sh
node dist/samples/sample-03.js
node dist/samples/sample-03.js --output a.txt
node dist/samples/sample-03.js --output a.txt --alone
node dist/samples/sample-03.js --output a.txt --detail
node dist/samples/sample-03.js --output a.txt --alone -d
node dist/samples/sample-03.js --output a.txt -a -d
node dist/samples/sample-03.js --output a.txt -ad
```

得到如下输出：

```
$ node dist/samples/sample-03.js
Output File: default.txt
Alone Mode:  Off
Detail Mode: Off

$ node dist/samples/sample-03.js --output a.txt
Output File: a.txt
Alone Mode:  Off
Detail Mode: Off

$ node dist/samples/sample-03.js --output a.txt --alone
Output File: a.txt
Alone Mode:  On
Detail Mode: Off

$ node dist/samples/sample-03.js --output a.txt --detail
Output File: a.txt
Alone Mode:  Off
Detail Mode: On

$ node dist/samples/sample-03.js --output a.txt --alone -d
Output File: a.txt
Alone Mode:  On
Detail Mode: On

$ node dist/samples/sample-03.js --output a.txt -a -d
Output File: a.txt
Alone Mode:  On
Detail Mode: On

$ node dist/samples/sample-03.js --output a.txt -ad
Output File: a.txt
Alone Mode:  On
Detail Mode: On
```

### 2.4. 可重复使用的带参选项

使用 GCC，VC++ 等编译器时，可以通过多次使用 -i 或者 /D 选项定义多个 include 路径，
或者多个预编译常量。

这里可以通过选项的 `multi` 字段设置某个选项可以重复使用。

> `multi` 字段仅对带参选项有意义。

```ts
// File: sources/samples/sample-04.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "output",
    "description": "Determine the path to the output file.",
    "shortcut": "o",
    "withArgument": true
});

parser.addOption({

    "name": "include",
    "description": "Add a path to include.",
    "shortcut": "i",
    "withArgument": true,
    "repeatable": true    // 可以重复使用
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

    if (result.existOption("output")) {

        console.log(`Output File: ${result.getOption("output")}`);
    }
    else {

        console.log(`Output File: default.txt`);
    }

    if (result.existOption("include")) {

        for (let i = 0; i < result.getOptionLength("include"); i++) {

            console.log(`Include: ${result.getOption("include", i)}`);
        }
    }

    for (let argv of result.arguments) {

        console.log(`Found Argument: ${argv}`);
    }
}
else {

    console.error(result.error);
}
```

尝试执行命令：

```sh
node dist/samples/sample-04.js -i ./a -i ./b -i ./c -o test.txt hello.c
```

得到输出如下：

```
$ node dist/samples/sample-04.js -i ./a -i ./b -i ./c -o test.txt hello.c
Output File: test.txt
Include: ./a
Include: ./b
Include: ./c
Found Argument: hello.c
```

### 2.5. 使用 -o=filename 风格的带参选项

默认情况下 Clap.js 仅支持 `-o filename` 这种**选项参数跟随风格**，如果需要使用 
`-o=filename` 这种**选项参数赋值风格**，则需要通过 `Clap.createSimpleParser` 
方法的参数配置。

```ts
// File: sources/samples/sample-05.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser({
    "follow": false,      // 禁止 -i xxxx 和 --input xxxx 选项参数跟随风格
    "shortAssign": true,  // 允许 -i=xxxx 简写式参数赋值风格
    "fullAssign": true    // 允许 --input=xxxx 长选项参数赋值风格
});

parser.addOption({
    "name": "input",
    "description": "Determine the input file.",
    "shortcut": "i",
    "withArgument": true
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

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

下面逐条测试

```sh
node dist/samples/sample-05.js -i=test.js
node dist/samples/sample-05.js --input=test.js
node dist/samples/sample-05.js -i test.js
node dist/samples/sample-05.js --input test.js
```

测试结果如下：

```sh
$ node dist/samples/sample-05.js -i=test.js
Input: test.js

$ node dist/samples/sample-05.js --input=test.js
Input: test.js

$ node dist/samples/sample-05.js -i test.js
Exception { # 参数跟随风格被禁止了
  _errno: 2,
  _message: 'Option "-i" requires an argument.' }

$ node dist/samples/sample-05.js --input test.js
Exception { # 参数跟随风格被禁止了
  _errno: 2,
  _message: 'Option "--input" requires an argument.' }
```

### 2.6. 使用 -ifilename 简写式参数附加风格

除了 `-i=filename` 这种**选项参数赋值风格**， Clap.js 还支持**简写式参数附加风格**
`-ofilename` ，同样可以通过 `Clap.createSimpleParser` 方法的参数配置。

```ts
// File: sources/samples/sample-06.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser({
    "follow": false,      // 禁止 -i xxxx 和 --input xxxx 参数跟随风格
    "shortAttach": true,  // 允许 -ixxxx 简写式参数附加风格
    "fullAssign": true    // 允许 --input=xxxx 长选项参数赋值风格
});

parser.addOption({
    "name": "input",
    "description": "Determine the input file.",
    "shortcut": "i",
    "withArgument": true
});

let result = parser.parse(process.argv.slice(2));

for (let unknown of result.unknwonOptions) {

    console.log(`Unknown option: ${unknown}.`);
}

if (result.success) {

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

下面逐条测试

```sh
node dist/samples/sample-06.js -itest.js
node dist/samples/sample-06.js --input=test.js
node dist/samples/sample-06.js -i test.js
node dist/samples/sample-06.js --input test.js
```

测试结果如下：

```sh
$ node dist/samples/sample-06.js -itest.js
Input: test.js

$ node dist/samples/sample-06.js --input=test.js
Input: test.js

$ node dist/samples/sample-06.js -i test.js
Exception { # 参数跟随风格被禁止了
  _errno: 2,
  _message: 'Option "-i" requires an argument.' }

$ node dist/samples/sample-06.js --input test.js
Exception { # 参数跟随风格被禁止了
  _errno: 2,
  _message: 'Option "--input" requires an argument.' }
```

## 3. 更多

命令行选项的分析到此为止，下面如果需要知道更多接口相关的内容，请阅读
[模块接口](./A.module-api.md)，或者点击下一章节继续阅读与命令相关的内容。

> [下一章：使用带命令的解析器](./02-use-command.md) | [返回目录](./index.md)
