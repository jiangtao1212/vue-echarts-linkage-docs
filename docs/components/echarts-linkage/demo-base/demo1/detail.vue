<template>
  <div class="btn-container">
    <div class="drag-rect drag-rect-line" draggable="true"><span>可拖拽折线系列</span></div>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage ref="echartsLinkageRef" :cols="1" :echarts-max-count="10" :empty-echart-count="2" language="zh-cn"
    grid-align :theme="theme" :use-graphic-location="false" :is-echarts-height-change="false"
    :echarts-height-fixed-count="2" @drop-echart="dropEchart" @listener-excel-view="listenerExcelView" />
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from "vue";
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, DropEchartType, ListenerExcelViewType, excelViewType, excelViewHeadType } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = 'line' as 'line' | 'bar';

// 新增series按钮
const addLinkageSeriesCommon = (type: 'line' | 'bar' = 'line', id?: string) => {
  function packageData() {
    const seriesData = RandomUtil.getSeriesData(6000);
    const baseLineData = JSON.parse(JSON.stringify(seriesData));
    if (Math.random() > 0.5) {
      for (let i = 0; i < 10; i++) {
        baseLineData[i][1] = 100000;
      }
    }
    const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
    const random = Math.floor(Math.random() * 100);
    const name = `新增图表${maxEchartsIdSeq}-${random}`;
    return { name, seriesData };
  }
  const { name, seriesData } = packageData();
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
  id = id || 'echart' + maxEchartsIdSeq;
  const oneDataType: OneDataType = {
    name: name,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: type,
    seriesData: seriesData,
  };
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

onMounted(() => {
  // 若没有传入主题，或者传入的主题数据不是响应式的，则可以使用changeAllEchartsTheme手动修改echarts图表的主题
  // themeListenerHandler(theme, (themeValue: ThemeType) => {
  //   echartsLinkageRef.value!.changeAllEchartsTheme(themeValue);
  // }, { immediate: true });
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
