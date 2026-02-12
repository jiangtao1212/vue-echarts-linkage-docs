<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="updateAllLinkageBtnClick">批量更新数据</el-button>
    <div style="width: 0.5vw;"></div>
    <el-button type="primary" size="small" @click="clearAllLinkageCustomTooltipFormatterBtnClick">批量清除自定义tooltip</el-button>
    <div style="width: 0.5vw;"></div>
    <div class="drag-rect drag-rect-line" draggable="true"><span>可拖拽折线系列</span></div>
    <div class="drag-rect drag-rect-line-custom-tooltip-formatter" draggable="true"><span>可拖拽系列(折线-自定义tooltip)</span></div>
    <div style="width: 0.5vw;"></div>
    <el-button type="primary" size="small" @click="replaceAllEchartsData">批量替换数据(提示自定义tooltip)</el-button>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage ref="echartsLinkageRef" :cols="1" :echarts-max-count="10" language="zh-cn" grid-align :theme="theme"
    :use-graphic-location="false" :is-echarts-height-change="false" :echarts-height-fixed-count="2"
    @drop-echart="dropEchart" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElButton } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, SeriesTagType, DropEchartType, ListenerExcelViewType, excelViewType, excelViewHeadType, SeriesClassType } from 'vue-echarts-linkage';
import { SERIES_CLASS_TYPE_DEFAULT } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = SERIES_CLASS_TYPE_DEFAULT as SeriesClassType;
let switchFlag = false;
let customTooltipFormatterFlag = false;

// 批量替换echarts数据(提示自定义tooltip)
const replaceAllEchartsData = async () => {
  const res: Array<OneDataType[]> = [];
  for (let i = 0; i < 3; i++) {
    const oneDataTypeArray: OneDataType[] = [];
    for (let j = 0; j < 2; j++) {
      const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
      const oneDataType: OneDataType = {
        name: `新增图表${maxEchartsIdSeq + 1}-${Math.floor(Math.random() * 1000)}`,
        type: 'line',
        seriesData: RandomUtil.getSeriesData(1000),
        customData: `新增图表${maxEchartsIdSeq + 1}-${Math.floor(Math.random() * 1000)}`,
        xAxisName: '[m]',
        yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
      };
      oneDataTypeArray.push(oneDataType);
    }
    res.push(oneDataTypeArray);
  }
  await echartsLinkageRef.value?.replaceAllEchartsData(res);
  echartsLinkageRef.value?.clearCustomTooltipFormatter();
  const allSeriesTagInfo = echartsLinkageRef.value?.getAllSeriesTagInfo();
  console.log("allSeriesTagInfo", allSeriesTagInfo);
  allSeriesTagInfo!.forEach((item: { id: string, series: Array<SeriesTagType> }) => {
    echartsLinkageRef.value!.addCustomTooltipFormatter((params: any) => {
      let tooltipHtml = '';
      // console.log("params", params);
      if (params && params.length > 0) {
        tooltipHtml += `${params[0].name}</br>`;
        params.forEach((item: any) => {
          // const index = item.componentIndex; // 未被隐藏系列的索引，params中不含有隐藏系列的数据
          // const dataIndex = item.dataIndex; // x轴数据索引
          let value = Array.isArray(item.value) ? item.value[1] : item.value; // 实际值
          value = `${value}&nbsp;<span style="color: green;">(差值: ${value}-1000=${value - 1000})<span>`;
          tooltipHtml += `<div>${item.marker}&nbsp;${item.seriesName}&nbsp;&nbsp;&nbsp;&nbsp;<span style="float: right;">${value}</span></div>`;
        });
      }
      return tooltipHtml;
    }, item.id);
  });
}

// 批量更新按钮 -- 只更新数据，这里不需要考虑是否为自定义tooltip
const updateAllLinkageBtnClick = () => {
  const allDistinctSeriesTagInfo: SeriesTagType[] = echartsLinkageRef.value?.getAllDistinctSeriesTagInfo() as SeriesTagType[];
  console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
  allDistinctSeriesTagInfo.forEach((item: SeriesTagType, index: number) => {
    if (item.dataType === 'switch') {
      item.seriesData = RandomUtil.getSwitchData(1000);
    } else {
      const seriesData = RandomUtil.getSeriesData(1000);
      item.seriesData = seriesData;
    }
  });
  echartsLinkageRef.value?.updateAllEcharts(allDistinctSeriesTagInfo);
}

// 新增series按钮
const addLinkageSeriesCommon = (type: 'line' | 'bar' = 'line', id?: string) => {
  let seriesData = RandomUtil.getSeriesData(6000);
  const baseLineData = JSON.parse(JSON.stringify(seriesData));
  if (Math.random() > 0.5) {
    for (let i = 0; i < 10; i++) {
      baseLineData[i][1] = 100000;
    }
  }
  if (switchFlag) {
    seriesData = RandomUtil.getSwitchData(6000);
  }
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
  id = id || 'echart' + maxEchartsIdSeq;
  const random = Math.floor(Math.random() * 100);
  const oneDataType: OneDataType = {
    name: `新增图表${maxEchartsIdSeq}-${random}`,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: type,
    seriesData: seriesData,
  };
  if (switchFlag) {
    oneDataType.dataType = 'switch';
    switchFlag = false;
  }
  echartsLinkageRef.value!.addEchartSeries(id, oneDataType);
  if (customTooltipFormatterFlag) {
    // 自定义tooltip formatter
    echartsLinkageRef.value!.addCustomTooltipFormatter((params: any) => {
      let tooltipHtml = '';
      // console.log("params", params);
      if (params && params.length > 0) {
        tooltipHtml += `${params[0].name}</br>`;
        params.forEach((item: any) => {
          // const index = item.componentIndex; // 未被隐藏系列的索引，params中不含有隐藏系列的数据
          // const dataIndex = item.dataIndex; // x轴数据索引
          let value = Array.isArray(item.value) ? item.value[1] : item.value; // 实际值
          value = `${value}&nbsp;<span style="color: green;">(差值: ${value}-500=${value - 500})<span>`;
          tooltipHtml += `<div>${item.marker}&nbsp;${item.seriesName}&nbsp;&nbsp;&nbsp;&nbsp;<span style="float: right;">${value}</span></div>`;
        });
      }
      return tooltipHtml;
    }, id);
    customTooltipFormatterFlag = false;
  }
}

// 批量清除自定义tooltip formatter
const clearAllLinkageCustomTooltipFormatterBtnClick = () => {
  echartsLinkageRef.value!.clearCustomTooltipFormatter();
}

// 新增按钮
const addLinkageBtnClick = () => {
  const seriesData = RandomUtil.getSeriesData(1000);
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
  const oneDataType: OneDataType = {
    name: `新增图表${maxEchartsIdSeq + 1}`,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: 'line',
    seriesData: seriesData,
  };
  echartsLinkageRef.value!.addEchart(oneDataType);
}

// 删除回调事件
const dropEchart = (data: DropEchartType) => {
  addLinkageSeriesCommon(seriesType, data.id);
}

// 监听拖拽事件
const initLisener = () => {
  const dragRectLine: HTMLElement = document.querySelector('.drag-rect-line') as HTMLElement;
  const dragRectLineCustomTooltipFormatter: HTMLElement = document.querySelector('.drag-rect-line-custom-tooltip-formatter') as HTMLElement;
  dragRectLine.addEventListener('dragstart', (e: DragEvent) => {
    console.log("dragstart");
    seriesType = 'line';
    e.dataTransfer!.setData('text', "123");
    e.dataTransfer!.dropEffect = 'move';
  });
  dragRectLineCustomTooltipFormatter.addEventListener('dragstart', (e: DragEvent) => {
    console.log("dragstart");
    seriesType = 'line';
    e.dataTransfer!.setData('text', "123");
    e.dataTransfer!.dropEffect = 'move';
    customTooltipFormatterFlag = true;
  });
}
const init = () => {
  initLisener();
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
