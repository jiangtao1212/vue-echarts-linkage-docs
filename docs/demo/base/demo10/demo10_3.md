<script setup>
import LinkageDemo103 from '@/components/echarts-linkage/demo-base/demo10/demo10_3/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的工具栏功能，包括：
> 1. Y轴区间设置
> 2. `:useYAxisLimitsCache="true"` 是否使用Y轴区间**缓存**，默认false不使用；为true时，使用Y轴区间**缓存**，存储图表的Y轴区间数据到浏览器本地缓存中

## 1. Y轴区间设置

* 工具栏中Y轴区间功能按钮，点击按钮后，子画面中会显示当前图表的所有Y轴区间设置。

<LinkageDemo103 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo10/demo10_3/detail.vue{7-10,21,58-60,123-125}
:::


## More docs

...


