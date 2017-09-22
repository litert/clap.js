# 结构 ICommandParseResult

> [返回目录](./index.md)

这个结构是描述 CommandParser 类的 parse 方法返回的结果。

```ts
interface ICommandParseResult extends IParseResult {

    /**
     * 分析得到的主命令名称（小写）
     */
    "mainCommand"?: string;

    /**
     * 分析得到的子命令名称（小写）
     */
    "subCommand"?: string;
}
```

> [返回目录](./index.md)
