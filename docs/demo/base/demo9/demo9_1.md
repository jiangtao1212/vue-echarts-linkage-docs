<script setup>
import LinkageDemo91 from '@/components/echarts-linkage/demo-base/demo9/demo9_1/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. 多列显示
> 2. Echarts实例高度分为固定高度和自适应高度两种模式
> 3. `:cols="2"` cols值为显示列数
> 4. `:is-echarts-height-change="false"` 每个echarts图表高度是否可变，为false时，echarts实例高度为固定高度；为true时，echarts实例高度为自适应高度。

## 1. 多列显示-固定高度

* 新增echarts实例，实例高度为固定高度。

<LinkageDemo91 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo9/demo9_1/detail.vue{10,11}
:::


## More docs

...


