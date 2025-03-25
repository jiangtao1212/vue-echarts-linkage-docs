<script setup>
import LinkageDemo5 from '@/components/echarts-linkage/demo-base/demo5/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 批量替换，适用于模板更新场景，实现模板图例所见即所得。
> 2. 核心方法：`replaceAllEchartsData: (newAllSeriesdata: OneDataType[][]) => void`
>   * 1) 切换为all-replace模式；
>   * 2) 清空所有echarts实例为空白Echarts；
>   * 3) 处理echarts实例数量变化；
>   * 4) 各个Echarts实例添加新的series。
> 3. 获取模板信息：`getTemplateTagsOption: () => Array<Array<DragItemType>>`。

## 1. 批量替换数据

* 批量更新数据，保持图例不变，数据更新。

<LinkageDemo5 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo5/detail.vue{3,4,5,7,39-83,87,101,112,128,151}
:::

## More docs

...


