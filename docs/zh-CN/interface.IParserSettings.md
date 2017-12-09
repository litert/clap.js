# 结构 IParserSettings

> [返回目录](./index.md)

该结构描述构造分析器的参数，用于配置分析器。

```ts
interface IParserSettings {

    /**
     * 开启 "-x arg1 arg2 .." 或者 "--Xxx arg1 arg2 ..." 选项参数跟随风格。
     *
     * 默认值： true
     */
    "follow"?: boolean;

    /**
     * 开启 "--Xxx=arg2" 长选项参数赋值风格。
     *
     * 默认值： false
     */
    "fullAssign"?: boolean;

    /**
     * 开启 "-x=arg1" 选项简写式参数赋值风格。
     *
     * 默认值： false
     */
    "shortAssign"?: boolean;

    /**
     * 开启 "-xarg1" 选项简写式参数附加风格。
     *
     * 默认值： false
     */
    "shortAttach"?: boolean;

    /**
     * 允许只使用选项，而不使用命令。
     *
     * 默认值： true
     */
    "allowOptionsOnly"?: boolean;
}
```

> [返回目录](./index.md)
