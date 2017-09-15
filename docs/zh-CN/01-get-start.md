# 快速入门

## 1. 安装

本项目并未发布到 npmjs.org，因此你目前只能通过如下方式安装：

```sh
npm i https://github.com/litert/clap.js --save
```

> 国内用户可以使用：
>
> ```sh
> npm i https://gitee.com/litert/clap.js --save
> ```

## 2. 使用

> 所有示例代码都在 sources/samples 目录下，以 sample-**.ts 格式命名

安装成功后，就可以开始用它处理命令行参数了，下面逐个看实例。

### 2.1. 标志选项基本用法

> 标志选项是指没有额外参数，仅需使用 -X 或者 --xxxx 作为开关的选项。
>
> 典型例子是 ls 命令的 -a 或者 -l 选项，这些选项没有附加参数，仅作为功能开关。

```ts
// File: sources/samples/sample-01.ts
import * as Clap from "@litert/clap";

// 创建一个简单解析器
let parser = Clap.createSimpleParser();

// 注册一个 --help 或者 -h 选项
parser.addOption({

    "name": "Help",
    "description": "Display the help text.",
    "shortName": "h" // shortName 是可选选项。
});

let result = parser.parse();

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
     * 逐个打印剩余的参数。
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
node sample-01.js --help
# 或者 
node sample-01.js -h
```

可以得到

```
$ node sample-01.js --help
This is help text
```

> 注意 -h 和 -H 是不同的，因为短选项名是区分大小写的，长选项名则不区分。

如果不使用 `--help` 或者 `-h`，比如：

```sh
node sample-01.js "hello world!" friend
```

则 `"hello world!"` 和 `friend` 会被当成参数，可以通过 `result.arguments` 属性或者 
`result.getArgument` 方法读取到。例如上面这条命令可以得到输出如下：

```
$ node dist/sample-01.js "hello world!" friend
Found Argument: hello world!
Found Argument: friend
```

### 2.2. 带参数的选项实例

```ts
// File: sources/samples/sample-02.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "output", // 配置一个 output 选项
    "description": "Determine the path to the output file.",
    "shortName": "o",
    "argPlaceholders": ["FILE"] // 指定 output 选项要求一个叫 FILE 的参数
});

let result = parser.parse();

if (result.success) {

    if (result.existOption("output")) {

        /**
         * 通过 result.getOption 方法读取 output 选项的参数表，返回的是一个字符串字典。
         *
         * 字典内有一个 key 为 FILE 的值。
         */
        console.log(`Output File: ${result.getOption("output").FILE}`);
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
node sample-02.js input.txt
node sample-02.js --output target.txt input.txt
node sample-02.js input.txt --output
```

得到输出：

```
$ node sample-02.js input.txt
Output File: default.txt      # 没有使用 --output 选项
Found Argument: input.txt

$ node sample-02.js --output target.txt input.txt
Output File: target.txt
Found Argument: input.txt

$ node sample-02.js input.txt --output
Exception {                    # --output 缺少 FILE 参数，因此 parse 失败。
  _errno: 2,
  _message: 'Failed to read argument FILE for option --output.' }
```

### 2.3. 短选项名组合

对于多个标志选项的短选项名 `-a`、`-b`、`-c` 可以简写为 `-abc`。

> 注意：带参数的选项的短选项名不可以组合使用！

```ts
// File: sources/samples/sample-03.ts
import * as Clap from "@litert/clap";

let parser = Clap.createSimpleParser();

parser.addOption({

    "name": "output",
    "description": "Determine the path to the output file.",
    "shortName": "o",
    "argPlaceholders": ["FILE"]
});

parser.addOption({

    "name": "alone", // 注册一个标志选项 alone
    "description": "just for test.",
    "shortName": "a"
});

parser.addOption({

    "name": "detail", // 注册一个标志选项 detail
    "description": "just for test.",
    "shortName": "d"
});

let result = parser.parse();

if (result.success) {

    if (result.existOption("output")) {

        /**
         * 通过 result.getOption 方法读取 output 选项的参数表，返回的是一个字符串字典。
         *
         * 字典内有一个 key 为 FILE 的值。
         */
        console.log(`Output File: ${result.getOption("output").FILE}`);
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
node sample-03.js
node sample-03.js --output a.txt
node sample-03.js --output a.txt --alone
node sample-03.js --output a.txt --detail
node sample-03.js --output a.txt --alone -d
node sample-03.js --output a.txt -a -d
node sample-03.js --output a.txt -ad
```

得到如下输出：

```
$ node sample-03.js
Output File: default.txt
Alone Mode:  Off
Detail Mode: Off

$ node sample-03.js --output a.txt
Output File: a.txt
Alone Mode:  Off
Detail Mode: Off

$ node sample-03.js --output a.txt --alone
Output File: a.txt
Alone Mode:  On
Detail Mode: Off

$ node sample-03.js --output a.txt --detail
Output File: a.txt
Alone Mode:  Off
Detail Mode: On

$ node sample-03.js --output a.txt --alone -d
Output File: a.txt
Alone Mode:  On
Detail Mode: On

$ node sample-03.js --output a.txt -a -d
Output File: a.txt
Alone Mode:  On
Detail Mode: On

$ node sample-03.js --output a.txt -ad
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
    "shortName": "o",
    "argPlaceholders": ["FILE"]
});

parser.addOption({

    "name": "include",
    "description": "Add a path to include.",
    "shortName": "i",
    "argPlaceholders": ["PATH"],
    "multi": true
});

let result = parser.parse();

if (result.success) {

    if (result.existOption("output")) {

        console.log(`Output File: ${result.getOption("output").FILE}`);
    }
    else {

        console.log(`Output File: default.txt`);
    }

    if (result.existOption("include")) {

        for (let i = 0; i < result.countOption("include"); i++) {

            console.log(`Include: ${result.getOption("include", i).PATH}`);
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
node sample-04.js -i ./a -i ./b -i ./c -o test.txt hello.
```

得到输出如下：

```
$ node sample-04.js -i ./a -i ./b -i ./c -o test.txt hello.c
Output File: test.txt
Include: ./a
Include: ./b
Include: ./c
Found Argument: hello.c
```
