# 结构 IParseResult

> [返回目录](./index.md)

这个结构是描述 SimpleParser 类的 parse 方法返回的结果。

```ts
interface IParseResult {

    /**
     * 判断是否分析成功。（中途没有遇到错误）
     */
    "success": boolean;

    /**
     * 当 success 字段为 false 时，此字段包含错误的原因。
     */
    "error"?: Exception;

    /**
     * 列举分析得到的所有选项的名称，不包括未知的选项。
     */
    "optionNames": string[];

    /**
     * 列举所有未被识别成命令、选项以及选项参数的参数。
     */
    "arguments": string[];

    /**
     * 列举所有符合选项格式，但是未能识别的选项。
     */
    "unknwonOptions": string[];

    /**
     * 判断是否有输入某个选项。
     *
     * @param name  选项名称（小写）
     */
    existOption(name: string): boolean;

    /**
     * 判断某个（可重复）选项是否被输入了多次。
     *
     * @param name  选项名称（小写）
     */
    isOptionRepeated(name: string): boolean;

    /**
     * 获取（可重复）选项参数的数量。
     *
     * @param name  选项名称（小写）
     */
    getOptionLength(name: string): number;

    /**
     * 获取某个选项
     *
     * @param name   选项名称（小写）
     * @param index  获取第几次输入的参数，默认为 0，第一个参数
     */
    getOption(name: string, index?: number): string;
}
```

> [返回目录](./index.md)
