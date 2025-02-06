<script setup>
import LinkageDemo4 from '@/components/echarts-linkage/demo4/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 批量替换，先置空所有实例，再一次性更新所有实例的数据
> 2. `replaceAllEchartsData: (newAllSeriesdata: OneDataType[][]) => void` 替换所有echarts，内部为先清除再添加，保证新旧echarts图表数量和数据不存在关联性

## 1. 批量替换

批量更新数据，保持图例不变，数据更新。

<LinkageDemo4 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo4/detail.vue
:::

## More docs

...


