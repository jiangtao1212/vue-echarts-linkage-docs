<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="addLinkageBtnClick">新增echarts实例</el-button>
    <el-button type="primary" size="small" @click="updateAllLinkageBtnClick">批量更新echarts</el-button>
    <div class="drag-rect drag-rect-line" draggable="true"><span>可拖拽折线系列</span></div>
    <div style="width: 5vw;"></div>
    <el-button type="primary" size="small" @click="() => groups = []">默认分组（联动）</el-button>
    <el-button type="primary" size="small" @click="() => groups = [[1], [2], [3], [4]]">清除分组</el-button>
    <el-button type="primary" size="small" @click="() => groups = [[1, 2], [3, 4]]">修改分组</el-button>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage 
    ref="echartsLinkageRef" 
    :cols="1" :echarts-max-count="10" language="zh-cn" grid-align
    :theme="theme" :use-graphic-location="false" :is-echarts-height-change="false" :echarts-height-fixed-count="5"
    :groups="groups" 
    @drop-echart="dropEchart" @listener-excel-view="listenerExcelView" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElButton } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, SeriesTagType, DropEchartType, ListenerExcelViewType, excelViewType, excelViewHeadType, SeriesClassType } from 'vue-echarts-linkage'
import { SERIES_CLASS_TYPE_DEFAULT } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = SERIES_CLASS_TYPE_DEFAULT as SeriesClassType;
let switchFlag = false;
let groups = ref<Array<Array<number>>>([[1, 3], [2, 4]]);

// 批量更新按钮
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

// 新增按钮
const addLinkageBtnClick = () => {
  const seriesData = RandomUtil.getSeriesData(1000);
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
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
    // 多卷首尾连接设置
    // seriesLink: {
    //   isLinkMode: true,
    //   head: [{ lebel: '宽度', prop: 'width' }, { lebel: '高度', prop: 'height' }],
    //   linkName: '卷号',
    //   linkData: [
    //     { label: 'P202410210001', data: RandomUtil.getSeriesData(1000), custum: { width: 1000, height: 100000 },
    //     { label: 'P202410210002', data: RandomUtil.getSeriesData(1000) },
    //     { label: 'P202410210003', data: RandomUtil.getSeriesData(1000) },
    //     { label: 'P202410210004', data: RandomUtil.getSeriesData(1000) },
    //   ]
    // },
  };
  echartsLinkageRef.value!.addEchart(oneDataType);
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
}

// 拖拽回调事件
const dropEchart = (data: DropEchartType) => {
  addLinkageSeriesCommon(seriesType, data.id);
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
  addLinkageBtnClick();
  addLinkageBtnClick();
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
