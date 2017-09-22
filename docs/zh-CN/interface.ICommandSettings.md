# 结构 ICommandSettings

> [返回目录](./index.md)

该结构描述一个命令的信息，用于注册命令。

```ts
interface ICommandSettings {

    /**
     * 命令的名称，不区分大小写。
     *
     * 格式：^[a-z0-9A-Z][-\w]+$
     */
    "name": string;

    /**
     * 命令的描述文字。
     */
    "description": string;

    /**
     * 命令的简写式，区分大小写。
     *
     * 格式：^[A-Za-z]$
     */
    "shortcut"?: string;
}
```

> [返回目录](./index.md)
