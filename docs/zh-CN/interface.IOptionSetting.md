# 结构 IOptionSetting

> [返回目录](./index.md)

```ts
interface IOptionSetting {

    /**
     * 选项的完整名称，不区分大小写。
     *
     * 格式：^[-a-zA-Z0-9]+$
     */
    "name": string;

    /**
     * 选项的描述文字。
     */
    "description": string;

    /**
     * 设定该选项是否可以接收一个参数。
     *
     * 默认值：false
     */
    "withArgument"?: boolean;

    /**
     * 设定该选项是否有默认值，仅当 withArgument 被设置为 true 时，该字段生效。
     *
     * 注：仅当命令行参数里有指定该选项，且未找到对于的参数时，才会从本字段读取。
     *
     * Default: null
     */
    "defaultArgument"?: string;

    /**
     * 选项的简写式，区分大小写。
     *
     * 格式：^[A-Za-z]$
     */
    "shortcut"?: string;

    /**
     * 设定是否可以重复输入该选项，得到多个参数。
     */
    "repeatable"?: boolean;
}
```

> [返回目录](./index.md)
