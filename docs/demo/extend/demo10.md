<script setup>
import LinkageDemo10 from '@/components/echarts-linkage/demo-extend/demo10/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. 自定义容器内容，绝对定位
> 2. `updateAllCustomContent: (htmls: string[]) => void;` 更新所有图表的自定义容器内容
> 2. `updateAllCustomContentById: (params: CustomContentHtmlType[]) => void` 更新所有图表的自定义容器内容，通过id更新
> 3. `updateCustomContentById: (param: CustomContentHtmlType) => void` 更新单个图表的自定义容器内容，通过id更新

## 1. 自定义容器内容

* 自定义容器内容，绝对定位，传入html字符串

<LinkageDemo10 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo10/detail.vue{41-44,74-76,106-112}
:::

## More docs

...


