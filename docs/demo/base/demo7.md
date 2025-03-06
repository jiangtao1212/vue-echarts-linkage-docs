<script setup>
import LinkageDemo7 from '@/components/echarts-linkage/demo-base/demo7/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. Echarts各实例联动功能。
> 2. `:is-linkage="false"` 设置为true，Echarts各实例设置联动；设置为false，Echarts各实例设置不联动

## 1. 基础联动

* Echarts各实例联动，内部使用的是echarts实例的group属性，设置group属性为同一个值，即可实现联动。

<LinkageDemo7 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo7/detail.vue{12}
:::

## More docs

...


