<script setup>
import LinkageDemo8 from '@/components/echarts-linkage/demo-extend/demo8/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. 多条数据进行首尾相连，合并为一条数据，中间以图表标线显示区分
> 2. 核心属性：`oneDataType下的属性seriesLink: { isLinkMode: true, linkData: [ { label, data }, ... ] }`
> 3. `isLink` 首尾相连模式，true：首尾相连，false：非首尾相连
> 4. 核心方法：`replaceAllEchartsData: (newAllSeriesdata: OneDataType[][]) => void`

## 1. 批量更新数据

* 多条数据进行首尾相连，合并为一条数据，中间以图表标线显示区分。

<LinkageDemo8 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo8/detail.vue{3,36-39,49-52,64-67,78-81,88}
:::

## More docs

...


