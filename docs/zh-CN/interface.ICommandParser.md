# 结构 ICommandParser

> [返回目录](./index.md)

这个结构用于描述命令解析器类专有接口，

```ts
interface ICommandParser extends ISimpleParser {

    /**
     * 注册一个新的主命令。遇到如下情况时会抛出异常：
     *
     * - 如果主命令名称已经存在。
     * - 如果主命令名称不合法。
     * - 如果命令简写式不合法。
     * - 如果命令简写式已经存在。
     *
     * @param opts   主命令信息
     */
    addCommand(opts: ICommandSettings): this;

    /**
     * 为一个主命令添加一个新的子命令。遇到如下情况时会抛出异常：
     *
     * - 如果子命令名称已经存在。
     * - 如果子命令名称不合法。
     * - 如果命令简写式不合法。
     * - 如果命令简写式已经存在。
     *
     * > 注：每个主命令都有独立的子命令命名空间，因此不同的主命令可以添加相同
     * > 名称或简写式的子命令。
     *
     * @param main   主命令名称
     * @param opts   子命令信息
     */
    addSubCommand(
        main: string,
        opts: ICommandSettings
    ): this;

    /**
     * 开始分析
     *
     * @param cmdArgs  包含命令行参数的数组。
     */
    parse(cmdArgs: string[]): ICommandParseResult;
}
```

> [返回目录](./index.md)
