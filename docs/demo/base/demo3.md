<script setup>
import LinkageDemo3 from '@/components/echarts-linkage/demo-base/demo3/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 批量更新数据，保持图例不变，数据更新
> 2. `getAllDistinctSeriesTagInfo: () => SeriesTagType[]` 获取所有不重复系列的标签信息
> 3. `updateAllEcharts: (newAllSeriesdata: SeriesTagType[]) => Promise<boolean>` 传入所有显示子项数据，更新所有echarts

## 1. 批量更新数据

* 批量更新数据，保持图例不变，数据更新。

<LinkageDemo3 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo3/detail.vue{3,30-42}
:::

## More docs

...


