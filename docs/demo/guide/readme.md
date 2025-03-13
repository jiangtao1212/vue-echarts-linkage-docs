# vue-echarts-linkage
> 支持 Vue>=v3

## 1. 介绍

vue-echarts-linkage 是基于 Echarts 实现的联动组件，可以实现多个图表之间的联动。
具体功能如下：
- 支持多个图表之间的联动
- 支持图例联动
- 支持开关量显示
- 支持图形定位
- 支持主题背景自定义
- 支持容器尺寸实时自适应
- 支持联动模式切换
- 支持图表类型切换
- 支持图表数据更新
- 支持图表事件监听
- 支持图表方法调用
- ...

## 2. 解决痛点
在Echarts中，图表的图例无法进行联动，只能通过点击图例来切换图表的显示，无法满足复杂的需求。当数据与数据之间需要进行关联性操作与对比时，需要大量的计算和配置，无法满足快速开发的需求。

vue-echarts-linkage 组件通过自定义封装的图例进行操作，拖拽合并，顺序移动、点击清除、批量清除，数据批量更新、批量替换、基础联动，主题切换、多列显示、高度自适应等功能，封装了数据视图、元素下载，图形定位、开关量显示等拓展功能，解决了上述痛点。

## 3. 安装及使用组件

### 3.1 安装组件
```bash
# 安装依赖
npm install vue-echarts-linkage
or
pnpm install vue-echarts-linkage

# 全局安装组件
import VueEchartsLinkage from "vue-echarts-linkage";
import "vue-echarts-linkage/dist/style.css";
...
const app = createApp(App);
app.use(VueEchartsLinkage);

# 按需引入组件
import { VueEchartsLinkage } from "vue-echarts-linkage";
import "vue-echarts-linkage/dist/style.css";
```

### 3.2 使用组件

```vue
<template>
  ...
  <VueEchartsLinkage 
    ref="echartsLinkageRef" 
    :cols="1" 
    :echarts-max-count="10"
    :echarts-colors="['red', 'blue', 'green', 'yellow', 'goldenrod', 'skyblue']" 
    language="zh-cn"
    grid-align
    ...
    @drop-echart="dropEchart" />
</template>
```

```vue
<script setup>
import { VueEchartsLinkage, type OneDataType, type SeriesTagType, type DropEchartType  } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
...
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
...
// 拖拽回调事件
const dropEchart = (data: dropEchartType) => {
  // 处理拖拽回调后逻辑
  ...
}
</script>
```


