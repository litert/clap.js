# 结构 ISimpleParser

> [返回目录](./index.md)

这个结构用于描述命令解析器类专有接口，

```ts
interface ISimpleParser extends ISimpleParser {

    /**
     * 注册一个新的选项。遇到如下情况时会抛出异常：
     *
     * - 如果选项名称已经存在。
     * - 如果选项名称不合法。
     * - 如果选项简写式不合法。
     * - 如果选项简写式已经存在。
     *
     * @param opts   选项信息
     */
    addOption(opts: IOptionSetting): ISimpleParser;

    /**
     * 开始分析。
     *
     * @param cmdArgs  包含命令行参数的数组。
     */
    parse(cmdArgs: string[]): IParseResult;
}
```

> [返回目录](./index.md)
