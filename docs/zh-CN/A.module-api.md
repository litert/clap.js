# 模块接口

## 1. 方法 createSimpleParser

该方法创建一个简单命令行参数解析器对象。

### 1.1. 方法签名

```ts
function createSimpleParser(): ISimpleParser;
```

## 2. 方法 createSimpleParser

该方法创建一个简单命令行参数解析器对象。

### 2.1. 方法签名

```ts
function createCommandParser(): ICommandParser;
```

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

## 9. 常量

```ts
/**
 * 选项的短名称必须是单个字母或数字。
 */
const E_INVALID_SHORT_OPTION: number = 0x0001;

/**
 * 缺少带参选项的参数。
 */
const E_LACK_OPTION_ARG: number = 0x0002;

/**
 * 未输入某个必须选项。
 */
const E_LACK_OPTION: number = 0x0003;

/**
 * 一级命令不可用。
 */
const E_INVALID_MAIN_COMMAND: number = 0x0004;

/**
 * 二级命令不可用。
 */
const E_INVALID_SUB_COMMAND: number = 0x0005;

/**
 * 命令的短名称必须是单个字母或数字。
 */
const E_INVALID_SHORT_COMMAND: number = 0x0006;

/**
 * 未输入一级命令。
 */
const E_LACK_MAIN_COMMAND: number = 0x0007;

/**
 * 未输入二级命令。
 */
const E_LACK_SUB_COMMAND: number = 0x0008;
```
