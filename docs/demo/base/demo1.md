<script setup>
import LinkageDemo1 from '@/components/echarts-linkage/demo1/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 拖拽新增数据
> 2. 联动效果展示
> 3. 联动事件监听
> 4. 核心调用方法：`addEchartSeries: (id: string, data: OneDataType) => void` 新增echarts系列

## 1. 拖拽新增数据

通过拖拽新增数据，可以实现数据的动态添加，上下对齐，联动效果展示。

<LinkageDemo1 />

<!-- <details>
<summary>点击查看代码</summary>

<<< ../components/echarts-linkage/demo1/detail.vue

</details> -->

::: details 点我查看代码
<<< @/components/echarts-linkage/demo1/detail.vue{3,23-46,49-51}
:::


## More docs

...
