<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="headToTailConnection">首尾连接echarts数据(多卷)</el-button>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage ref="echartsLinkageRef" :cols="1" :echarts-max-count="10" language="zh-cn" grid-align
    :theme="theme" :use-graphic-location="false" :is-echarts-height-change="false" :echarts-height-fixed-count="2" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElButton } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type { OneDataType, SeriesDataType, ListenerExcelViewType, excelViewType, excelViewHeadType } from 'vue-echarts-linkage';
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();

// 批量替换echarts实例数据-多卷
const headToTailConnection = () => {
  const res: Array<OneDataType[]> = [];
  const data1 = getRandomCountLinkData(2);
  for (let i = 0; i < 3; i++) {
    const oneDataTypeArray: OneDataType[] = [];
    if (i === 0) {
      const oneDataType: OneDataType = {
        name: `开卷机外径`,
        type: 'line',
        seriesData: [],
        customData: `开卷机外径`,
        xAxisName: '[m]',
        yAxisName: `[mm]`,
        seriesLink: {
          isLinkMode: true,
          linkData: getRandomCountLinkData(2)
        }
      };
      oneDataTypeArray.push(oneDataType);
      const oneDataType1: OneDataType = {
        name: `带头剪切实际值M`,
        type: 'line',
        seriesData: RandomUtil.getSeriesData(1000),
        customData: `开卷机外径`,
        xAxisName: '[m]',
        yAxisName: `[mm]`,
        seriesLink: {
          isLinkMode: true,
          linkData: data1
        }
      };
      oneDataTypeArray.push(oneDataType1);

    } else if (i === 1) {
      const oneDataType: OneDataType = {
        name: `带头剪切实际值M`,
        type: 'line',
        seriesData: RandomUtil.getSeriesData(1000),
        customData: `开卷机外径`,
        xAxisName: '[m]',
        yAxisName: `[mm]`,
        seriesLink: {
          isLinkMode: true,
          linkData: data1
        }
      };
      oneDataTypeArray.push(oneDataType);
    } else if (i === 2) {
      const oneDataType: OneDataType = {
        name: `液压站油箱液位`,
        type: 'line',
        seriesData: [],
        customData: `液压站油箱液位`,
        xAxisName: '[m]',
        yAxisName: `[mm]`,
        seriesLink: {
          isLinkMode: true,
          linkData: getRandomCountLinkData(2)
        }
      };
      oneDataTypeArray.push(oneDataType);
    }
    res.push(oneDataTypeArray);
  }
  console.log("res", res);
  echartsLinkageRef.value?.replaceAllEchartsData(res);
}

// 随机获取首尾连接数据
const getRandomCountLinkData = (count: number) => {
  const res: Array<{ label: string, data: SeriesDataType }> = [];
  for (let i = 0; i < count; i++) {
    const label = `P20241021000${i + 1}`;
    const data = RandomUtil.getSeriesData(1000);
    res.push({ label, data });
  }
  return res;
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

const init = () => {
  addLinkageBtnClick();
  addLinkageBtnClick();
  headToTailConnection();
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
