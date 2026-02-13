<script setup>
import LinkageDemo9 from '@/components/echarts-linkage/demo-extend/demo9/demo9_2/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. 操作额外的提示框tooltip数据，就是在提示框内部最下面新增额外的信息，不影响提示框中原本的信息。
> 2. `addExtraTooltip: (extraTooltipData: Array<ExtraTooltipDataItemType>, id?: string) => void` 新增额外的tooltip数据，如果id存在，则添加单个图表，否则添加所有图表
> 3. `updateExtraTooltip: (extraTooltipData: Array<ExtraTooltipDataItemType>, id?: string) => void` 更新额外的tooltip数据，如果id存在，则更新单个图表，否则更新所有图表
> 4. `clearExtraTooltip: (id?: string) => void` 清除额外的tooltip数据，如果id存在，则清除单个图表，否则清除所有图表


## 1. 操作额外的提示框tooltip数据

* 包括新增、更新、清除。

<LinkageDemo9 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo9/demo9_2/index.vue{4,6,9,11,55-63,80-82,130}
:::

## More docs

...


