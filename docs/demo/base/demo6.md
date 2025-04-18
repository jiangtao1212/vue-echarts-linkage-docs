<script setup>
import LinkageDemo6 from '@/components/echarts-linkage/demo-base/demo6/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的基础示例。

> 注意：基础示例包含了最基本的联动功能，包括：
> 1. Echarts主题切换功能。
> 2. `:theme="theme"` theme值为响应式数据时，echarts实例会自动切换主题。
> 3. `theme="light"` theme值为非响应式数据时，可使用 `changeAllEchartsTheme: (theme: ThemeType) => void` 方法手动切换主题。

## 1. 基础联动

* Echarts主题切换功能。

<LinkageDemo6 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-base/demo6/detail.vue{12,38-40}
:::

## More docs

...


