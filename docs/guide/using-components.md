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

<script>
export default {
  data(){
    return {
      pageData:[
        {
          value:'1',
          label:'黑河市'
        },
        {
          value:'2',
          label:'孝感市'
        },
        {
          value:'3',
          label:'讷河市'
        }
      ]
    }
  }
}
</script>

## 代码实例
::: demo
<template>
    <el-select-page
    @on-page-change="handlePageChange"
    :data="pageData"
    :totalItems="7"
    :pageSize="pageSize"
    :multiple="true"
    />
</template>

<script>

const data = [
        {
          label:'1',
          value:1
        },
        {
          label:'2',
          value:2
        },
        {
          label:'3',
          value:3
        },
        {
          label:'4',
          value:4
        },
        {
          label:'5',
          value:5
        },
        {
          label:'6',
          value:6
        },
        {
          label:'7',
          value:7
        }
      ]
export default {
  data(){
    return {
      pageData:[],
      pageSize:3,
      page:1
    }
  },
  mounted(){
    this.pageData = data.slice((this.page-1)*this.pageSize,this.page*this.pageSize)
  },
    methods: {
        handlePageChange(page,size){
          this.page = page
          this.pageData = data.slice((page-1)*size,page*size)
        }
    },
}
</script>

<style>
button {
    color: blue;
}
</style>
:::


## 参数

| 参数    | 说明 | 类型   | 可选值 | 默认值  |
| ------- | ---- | ------ | ------ | ------- |
| message | 信息 | string | -      | "world" |
