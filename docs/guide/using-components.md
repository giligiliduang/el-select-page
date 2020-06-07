# 组件文档

## 安装

```bash
yarn add el-select-page
```

在 main.js 中写入以下内容：

```js
import ElSelectPage from "el-select-page";
import "el-select-page/lib/index.css";

Vue.use(ElSelectPage);
```

## 代码实例

<code-box title="标题" description="这是helloworld的demo简单描述支持`简单md格式`">
  <p>下面是hello world 的 vue 组件</p>
  <el-select-page message="World"></el-select-page>
  <p>这是底部说明文字</p>
</code-box>

```vue
<el-select-page :message="World"></el-select-page>
```

## 参数

| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| message | 信息 | string | -      | "world" |
