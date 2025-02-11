<template>
  <div class="btn-container">
    <div class="drag-rect drag-rect-line base-mode" draggable="true"><span>可拖拽折线（带基线比较）</span></div>
    <div class="drag-rect drag-rect-line pieces-mode" draggable="true"><span>可拖拽折线（非基线比较）</span></div>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage ref="echartsLinkageRef" :cols="1" :echarts-max-count="10" language="zh-cn"
    grid-align :theme="theme" :use-graphic-location="false" :is-echarts-height-change="false"
    :echarts-height-fixed-count="2" @drop-echart="dropEchart"
    @listener-excel-view="listenerExcelView" />
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from "vue";
import { RandomUtil } from "../../../utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, DropEchartType, ListenerExcelViewType, excelViewType, excelViewHeadType } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { type ThemeType, useTheme } from "../../../../composables/useTheme";
const { theme, themeListenerHandler } = useTheme(); // 获取实时主题
themeListenerHandler((themeValue: ThemeType) => {
  echartsLinkageRef.value!.changeAllEchartsTheme(themeValue);
});

const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = 'line' as 'line' | 'bar';
let btnMode = 'base-mode' as 'base-mode' | 'pieces-mode';

// 组装数据
const packageData = () => {
  const seriesData = RandomUtil.getSeriesData(1000);
    const baseLineData = JSON.parse(JSON.stringify(seriesData));
    const belowSection = [[0, 50], [200, 280], [500, 600], [800, 900]];
    for (let i = 0; i < belowSection.length; i++) {
      const [start, end] = belowSection[i];
      for (let j = start; j < end; j++) {
        baseLineData[j][1] = 100000;
      }
    }
    const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
    const random = Math.floor(Math.random() * 100);
    const name = `新增图表${maxEchartsIdSeq}-${random}`;
    return { name, seriesData, baseLineData };
}

// 组装基线比较模式数据
const packageBaseLineModeData = (type: 'line' | 'bar' = 'line') => {
  const { name, seriesData, baseLineData } = packageData();
  const oneDataType: OneDataType = {
    name: name,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: type,
    seriesData: seriesData,
    visualMapSeries: {
      pieces: [],
      baseLine: {
        mode: 'below',
        value: baseLineData,
        isShowOnToolTip: true,
      }
    },
  };
  return oneDataType;
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

// 新增series按钮
const addLinkageSeriesCommon = (type: 'line' | 'bar' = 'line', id?: string) => {
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
  id = id || 'echart' + maxEchartsIdSeq;
  let oneDataType: OneDataType = {} as OneDataType;
  if (btnMode === 'base-mode') {
    // 基线比较模式
    oneDataType = packageBaseLineModeData(type);
  }
  if (btnMode === 'pieces-mode') {
    // 非基线比较模式
    oneDataType = packagePieceModeData();
  }
  echartsLinkageRef.value!.addEchartSeries(id, oneDataType);
}

// 新增按钮
const addLinkageBtnClick = () => {
  const oneDataType: OneDataType = packagePieceModeData();
  echartsLinkageRef.value!.addEchart(oneDataType);
}

// 拖拽回调事件
const dropEchart = (data: DropEchartType) => {
  addLinkageSeriesCommon(seriesType, data.id);
}

// 监听拖拽事件
const initLisener = () => {
  const dragRectLine: HTMLElement = document.querySelector('.base-mode') as HTMLElement;
  const dragRectBar: HTMLElement = document.querySelector('.pieces-mode') as HTMLElement;

  dragRectLine.addEventListener('dragstart', (e: DragEvent) => {
    btnMode = 'base-mode';
  });
  dragRectBar.addEventListener('dragstart', (e: DragEvent) => {
    btnMode = 'pieces-mode'; 
  });
}

// 监听excel数据视图按钮点击事件
const listenerExcelView = (data: ListenerExcelViewType) => {
  console.log("listenerExcelView", data);
  const { id, seriesLink, callback } = data;
  console.log("id", id);
  console.log("seriesLink", seriesLink);
  let params: excelViewType;
  if (seriesLink && seriesLink.isLinkMode) {
    const primaryKeyValues = seriesLink?.linkData.map(item => item.label); // 提取主键值
    params = { // 多卷
      headXname: '长度',
      preAdd: [
        { name: '卷号', value: primaryKeyValues, isPrimaryKey: true },
        { name: '宽度', value: [1000, 1500] },
        { name: '厚度', value: [0.35, 0.40] },
      ] as excelViewHeadType[],
    }
  } else {
    params = { // 单卷
      headXname: '长度',
      preAdd: [{ name: '卷号', value: 'P202410210001', isPrimaryKey: true } as excelViewHeadType],
      postAdd: [{ name: '备注', value: '备注信息' } as excelViewHeadType],
    }
  }
  callback(params);
}

const init = () => {
  initLisener();
  addLinkageBtnClick();
  addLinkageSeriesCommon();
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
<style>
.echarts-linkage-container .main-container {
  padding-bottom: 0 !important;
}
</style>
