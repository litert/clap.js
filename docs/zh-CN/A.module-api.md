# 模块接口

> [返回目录](./index.md)

## 1. 方法 createSimpleParser

该方法创建一个简单命令行参数解析器对象。

### 1.1. 方法签名

```ts
function createSimpleParser(
    opts?: IParserSettings
): ISimpleParser;
```

#### 1.2. 参数说明

-   `opts` 可选

    该参数用于传递一个配置项给解析器对象。

    参考：[接口 IParserSettings](./interface.IParserSettings.md)

## 2. 方法 createCommandParser

该方法创建一个支持命令的命令行参数解析器对象。

### 2.1. 方法签名

```ts
function createCommandParser(
    opts?: IParserSettings
): ICommandParser;
```

#### 2.2. 参数说明

-   `opts` 可选

    该参数用于传递一个配置项给解析器对象。

    参考：[接口 IParserSettings](./interface.IParserSettings.md)

## 3. 接口 ISimpleParser

[点击查看详细](./interface.ISimpleParser.md)。

## 4. 接口 ICommandSettings

[点击查看详细](./interface.ICommandSettings.md)。

## 5. 接口 IOptionSetting

[点击查看详细](./interface.IOptionSetting.md)。

## 6. 接口 IParseResult

[点击查看详细](./interface.IParseResult.md)。

## 7. 接口 ICommandParseResult

[点击查看详细](./interface.ICommandParseResult.md)。

## 8. 接口 ICommandParser

[点击查看详细](./interface.ICommandParser.md)。

## 9. 接口 IParserSettings

[点击查看详细](./interface.IParserSettings.md)。

## 10. 常量

```ts
/**
 * 选项的简写式必须是单个字母或数字。
 */
const E_INVALID_SHORT_OPTION: number = 0x0001;

/**
 * 缺少带参选项的参数。
 */
const E_LACK_OPTION_ARG: number = 0x0002;

/**
 * 只有标志选项才可以用在选项组合中。
 */
const E_FORBIDDEN_COMPACT: number = 0x0003;

/**
 * 主命令不存在
 */
const E_INVALID_MAIN_COMMAND: number = 0x0004;

/**
 * 子命令不存在
 */
const E_INVALID_SUB_COMMAND: number = 0x0005;

/**
 * 命令的简写式必须是单个字母。
 */
const E_INVALID_SHORT_COMMAND: number = 0x0006;

/**
 * 未输入主命令。
 */
const E_LACK_MAIN_COMMAND: number = 0x0007;

/**
 * 未输入子命令。
 */
const E_LACK_SUB_COMMAND: number = 0x0008;

/**
 * 选项参数赋值风格未被允许。
 */
const E_FORBIDDEN_ASSIGN: number = 0x0009;

/**
 * 只有带参选项才可以被赋值。
 */
const E_ASSIGN_TO_FLAG: number = 0x000A;

/**
 * 主命令已经注册。
 */
const E_DUPLICATED_MAIN_COMMAND: number = 0x000B;

/**
 * 该主命令的简写式已经被注册。
 */
const E_DUPLICATED_MAIN_SHORTCUT: number = 0x000C;

/**
 * 子命令已经注册。
 */
const E_DUPLICATED_SUB_COMMAND: number = 0x000D;

/**
 * 该子命令的简写式已经被注册。
 */
const E_DUPLICATED_SUB_SHORTCUT: number = 0x000E;

/**
 * 命令名称不合法。
 */
const E_INVALID_COMMAND_NAME: number = 0x000F;
```

> [快速入门](./01-get-start.md) | [返回目录](./index.md)
