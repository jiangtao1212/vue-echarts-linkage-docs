<script setup>
import LinkageDemo8 from '@/components/echarts-linkage/demo-base/demo8/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. echarts实例高度设置自适应和固定值。
> 2. `:is-echarts-height-change="true"` 设置为true，echarts实例高度自适应；设置为false，echarts实例高度固定
> 3. `:echarts-height-fixed-count="2"` 配合 `is-echarts-height-change` 属性值为false时使用，echarts高度固定数量

## 1. 实例高度自适应

* Echarts实例高度自适应。

<LinkageDemo8 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo8/detail.vue{10}
:::

## More docs

...


