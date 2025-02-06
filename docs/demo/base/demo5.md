<script setup>
import LinkageDemo5 from '@/components/echarts-linkage/demo5/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 清空所有数据，更新图表
> 2. `clearAllEchartsData: (mode: 'clear' | 'delete') => Promise<void>` 
清空所有echarts数据：当mode为'clear'（默认值）时，清除数据保留当前空白echarts实例；当mode为'delete'时，删除当前实例。

## 1. 批量更新数据

清空所有数据，更新图表。

<LinkageDemo5 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo5/detail.vue
:::

## More docs

...


