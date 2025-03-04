<script setup>
import LinkageDemo7 from '@/components/echarts-linkage/demo-extend/demo7/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. Echarts各实例分组联动
> 2. `:groups="[[1, 3], [2, 4]]"` 分组属性，二维数组：第一维表示分组，第二维表示该分组下的chart序号（序号从1开始）

## 1. 批量更新数据

* Echarts各实例分组联动，未设定的剩余的实例将划分为一组，实现联动。

<LinkageDemo7 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo7/detail.vue{12}
:::

## More docs

...


