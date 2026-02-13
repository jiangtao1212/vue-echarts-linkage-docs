<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="addLinkageBtnClick">新增echarts实例</el-button>
    <el-button type="primary" size="small" @click="addLotEmptyLinkageBtnClick">批量新增空白echarts</el-button>
    <div class="drag-rect drag-rect-line" draggable="true"><span>可拖拽折线系列</span></div>
    <el-button type="primary" size="small" @click="addLotEmptyLinkageBtnClick">设置Y轴区间缓存</el-button>
    <div class="flex justify-center items-center">
      <span class="text-12px">设置Y轴区间缓存：</span>
      <el-switch v-model="useYAxisLimitsCache" inline-prompt active-text="是" inactive-text="否" />
    </div>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage 
    ref="echartsLinkageRef_2" 
    :cols="1" 
    :is-echarts-height-change="false"
    :echarts-max-count="10"
    grid-align :theme="theme" :use-graphic-location="false" 
    :echarts-height-fixed-count="2" @drop-echart="dropEchart"
    :extra-option="extraOption"
    :useYAxisLimitsCache="useYAxisLimitsCache" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElButton, ElSwitch } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, DropEchartType } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef_2 = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = 'line' as 'line' | 'bar';
let switchFlag = false;
const useYAxisLimitsCache = ref(true);

// 额外的配置项
const extraOption = {
  toolbox: {
    feature: {
      myThemeButton: {
        show: false
      },
      myEnlargeShrinkButton: {
        show: false
      },
      myExcelView: {
        show: false
      },
      mySaveAsImage: {
        show: false
      },
      myDeleteButton: {
        show: false
      },
      myRectionLimit: {
        show: true
      }
    }
  },
}

// 新增按钮
const addLinkageBtnClick = () => {
  const seriesData = RandomUtil.getSeriesData(1000);
  const maxEchartsIdSeq = echartsLinkageRef_2.value!.getMaxEchartsIdSeq();
  const oneDataType: OneDataType = {
    name: `新增图表${maxEchartsIdSeq + 1}`,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: 'line',
    seriesData: seriesData,
    // markLineArray: [RandomUtil.getRandomDataFromInterval(0, 1000), RandomUtil.getRandomDataFromInterval(0, 1000)]
    visualMapSeries: {
      pieces: [{ min: 5000, max: 8000 }],
      piecesOnTooltip: { show: true, value: '自定义pieces' }
    },
  };
  echartsLinkageRef_2.value!.addEchart(oneDataType);
}

// 批量新增空白echarts，携带legend数据
const addLotEmptyLinkageBtnClick = () => {
  for (let i = 0; i < 1; i++) {
    const oneDataTypeArray: OneDataType[] = [];
    for (let j = 0; j < 3; j++) {
      const maxEchartsIdSeq = echartsLinkageRef_2.value!.getMaxEchartsIdSeq();
      const oneDataType: OneDataType = {
        name: `新增图表${maxEchartsIdSeq + 1}-${Math.floor(Math.random() * 1000)}`,
        type: 'line',
        seriesData: [],
        customData: `新增图表${maxEchartsIdSeq + 1}-${Math.floor(Math.random() * 1000)}`,
        xAxisName: '[m]',
        yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
      };
      oneDataTypeArray.push(oneDataType);
    }
    echartsLinkageRef_2.value!.addEchart(oneDataTypeArray);
  }
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
  const maxEchartsIdSeq = echartsLinkageRef_2.value!.getMaxEchartsIdSeq();
  id = id || 'echart' + maxEchartsIdSeq;
  const random = Math.floor(Math.random() * 100);
  const oneDataType: OneDataType = {
    name: `新增图表${maxEchartsIdSeq}-${random}`,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: type,
    seriesData: seriesData,
    yAxisMin: 500,
    yAxisMax: 5000,
    yAxisAlignTicks: false,
  };
  if (switchFlag) {
    oneDataType.dataType = 'switch';
    switchFlag = false;
  }
  echartsLinkageRef_2.value!.addEchartSeries(id, oneDataType);
}

// 拖拽回调事件
const dropEchart = (data: DropEchartType) => {
  addLinkageSeriesCommon(seriesType, data.id);
}

const init = () => {
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
