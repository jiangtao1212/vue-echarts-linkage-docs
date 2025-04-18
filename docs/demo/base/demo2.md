<script setup>
import LinkageDemo2 from '@/components/echarts-linkage/demo-base/demo2/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 新增echarts实例，并且携带数据
> 2. 新增空白图表，只有图例，没有数据
> 3. 核心调用方法：`addEchart: (data?: OneDataType | OneDataType[] | undefined) => void` 新增一个echarts图表

## 1. 新增echarts实例

* 新增echarts实例，并且携带数据。

<LinkageDemo2 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo2/detail.vue{3,4,31-46,49-66}
:::


## More docs

...


