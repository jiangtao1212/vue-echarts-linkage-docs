<script setup>
import LinkageDemo2 from '@/components/echarts-linkage/demo-extend/demo2/index.vue';
</script>

# 示例说明

vue-echarts-linkage 联动组件的拓展示例。

> 注意：拓展示例包含的功能，包括：
> 1. 图片下载功能
> * 核心方法：`downloadAllEchartsImg: () => void` 

## 1. 实例图片下载

* 下载包含所有echarts实例的图片，包含滚动条下的内容。
* 若处于非联动状态，组件本身的下载按钮只会下载自身实例图片。

<LinkageDemo2 />

::: details 点我查看代码
<<< @/components/echarts-linkage/demo-extend/demo2/detail.vue{4,25-27}
:::


## More docs

...


