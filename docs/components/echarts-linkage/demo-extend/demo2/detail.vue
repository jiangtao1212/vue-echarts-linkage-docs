<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="addLinkageBtnClick">新增echarts实例</el-button>
    <el-button type="primary" size="small" @click="downloadImg">下载图片</el-button>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage ref="echartsLinkageRef" :cols="1" :echarts-max-count="10" language="zh-cn"
    grid-align :theme="theme" :use-graphic-location="false" :is-echarts-height-change="false"
    :echarts-height-fixed-count="2" />
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from "vue";
import { ElButton } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, ListenerExcelViewType, excelViewType, excelViewHeadType } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();

// 下载图片
const downloadImg = () => {
  echartsLinkageRef.value?.downloadAllEchartsImg();
}

// 组装非基线比较模式数据
const packagePieceModeData = () => {
  const seriesData = RandomUtil.getSeriesData(1000);
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
  const oneDataType: OneDataType = {
    name: `新增图表${maxEchartsIdSeq + 1}`,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: 'line',
    seriesData: seriesData,
    visualMapSeries: {
      pieces: [{
        min: 100, //name.includes('温度')?myData.temp[1]:myData.vibration[1],
        max: 3000, //name.includes('温度')?200:10
        color: '#efab2e'
      }, {
        min: 5000,
        max: 8000,
        color: '#ff002e'
      }],
      piecesOnTooltip: {
        show: true,
        value: '黄：100-3000, 红：5000-8000'
      }
    },
  };
  return oneDataType;
}

// 新增按钮
const addLinkageBtnClick = () => {
  const oneDataType: OneDataType = packagePieceModeData();
  echartsLinkageRef.value!.addEchart(oneDataType);
}

const init = () => {
  addLinkageBtnClick();
  addLinkageBtnClick();
  addLinkageBtnClick();
}

onMounted(() => {
  init();
});
</script>

<style scoped lang="less">
.btn-container {
  height: 5vh;
  padding: 10px;
  display: flex;
  align-items: center;
  column-gap: 10px;

  .drag-rect {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    border-radius: 4px;
    padding: 5px 11px;
    background-image: linear-gradient(to right, #4286f4, #00b4d8);
    border: 1px solid #00b4d8;

    span {
      color: #fff;
      font-size: 12px;
      line-height: 12px;
    }
  }
}

.echarts-linkage-container {
  width: 100%;
  height: 60vh;
}

</style>
<style scoped lang="less">
.el-button {
  margin-left: 0;
}
</style>
<style>
.echarts-linkage-container .main-container {
  padding-bottom: 0 !important;
}
</style>
