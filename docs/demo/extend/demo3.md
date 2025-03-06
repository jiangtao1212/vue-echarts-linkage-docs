<script setup>
import LinkageDemo3 from '@/components/echarts-linkage/demo-extend/demo3/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. 图形定位功能
> 2. `:use-graphic-location="true"` 开启图形定位功能
> 3. `@listener-graphic-location` 事件监听，获取图形位置信息

## 1. 图形定位

* 图形定位功能，拖拽图形，即可获取图形位置信息。

<LinkageDemo3 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo3/detail.vue{9,33-35}
:::

## More docs

...


