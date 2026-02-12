<script setup>
import LinkageDemo9 from '@/components/echarts-linkage/demo-extend/demo9/demo9_1/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. 自定义格式化提示框tooltip数据
> 2. `addCustomTooltipFormatter: (tooltipFormatterCallback: TooltipFormatterCallback<TooltipFormatterCallbackParams>, id?: string, isRender?: boolean) => void` 添加自定义tooltip formatter，默认值为false，不重新渲染echarts
> 3. `updateCustomTooltipFormatter: (tooltipFormatterCallback: TooltipFormatterCallback<TooltipFormatterCallbackParams>, id?: string, isRender?: boolean) => void` 更新自定义tooltip formatter，默认值为false，不重新渲染echarts
> 4. `  clearCustomTooltipFormatter: (id?: string, isRender?: boolean) => void` 清除自定义tooltip formatter，默认值为true，重新渲染echarts


## 1. 自定义格式化提示框tooltip数据

* 包括添加、更新、清除。

<LinkageDemo9 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo9/demo9_1/index.vue{4,6,9,11,55-63,80-82,130}
:::

## More docs

...


