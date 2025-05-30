<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="addLinkageBtnClick">新增echarts实例</el-button>
    <el-button type="primary" size="small" @click="addLotEmptyLinkageBtnClick">批量新增空白echarts</el-button>
    <el-button type="primary" size="small" @click="updateAllLinkageBtnClick">批量更新echarts</el-button>
    <el-button type="primary" size="small" @click="replaceAllEchartsData1">批量替换echarts数据(多卷)</el-button>
    <div class="drag-rect drag-rect-line" draggable="true"><span>可拖拽折线系列</span></div>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <!-- <div class="h-80vh overflow-y-auto"> class="h-100vh !w-98%" -->
  <ClientOnly>
    <VueEchartsLinkage ref="echartsLinkageRef" id="echarts-linkage-view" :cols="1" :echarts-max-count="10"
      :empty-echart-count="2" :echarts-colors="['#000', 'blue', 'green', 'yellow', 'goldenrod', 'pink']"
      language="zh-cn" grid-align :theme="theme" :is-linkage="true" :use-graphic-location="false"
      :is-echarts-height-change="false" :echarts-height-fixed-count="2" is-show-excel-view @drop-echart="dropEchart"
      @listener-graphic-location="listenerGraphicLocation" @delete-echart="deleteEchart"
      @listener-excel-view="listenerExcelView" />
  </ClientOnly>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElButton } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type {
  OneDataType, SeriesTagType, DropEchartType, DeleteEchartType,
  ListenerGrapicLocationType, SeriesDataType, ListenerExcelViewType, excelViewType, excelViewHeadType
} from 'vue-echarts-linkage'
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = 'line' as 'line' | 'bar';
let switchFlag = false;

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

// 测试基准线按钮点击
const testBaseLineBtnClick = () => {
  const seriesData = RandomUtil.getSeriesData(1000);
  // const baseLineData = RandomUtil.getSeriesData(1000); 
  const baseLineData = JSON.parse(JSON.stringify(seriesData));
  for (let i = 0; i < 10; i++) {
    baseLineData[i][1] = 100000;
  }
  const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
  const oneDataType1: OneDataType = {
    name: `新增图表${maxEchartsIdSeq + 1}`,
    yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
    type: 'line',
    seriesData: seriesData,
    visualMapSeries: {
      pieces: [],
      baseLine: {
        mode: 'below',
        value: baseLineData,
      }
    },
  };
  echartsLinkageRef.value!.addEchart([oneDataType1]);
}

// 批量新增空白echarts，携带legend数据
const addLotEmptyLinkageBtnClick = () => {
  for (let i = 0; i < 3; i++) {
    const oneDataTypeArray: OneDataType[] = [];
    for (let j = 0; j < 6; j++) {
      const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
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
    echartsLinkageRef.value!.addEchart(oneDataTypeArray);
  }
}

// 批量更新按钮
const updateAllLinkageBtnClick = () => {
  const allDistinctSeriesTagInfo: SeriesTagType[] = echartsLinkageRef.value?.getAllDistinctSeriesTagInfo() as SeriesTagType[];
  console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
  const res: { [key: string]: Array<number[]> } = {};
  const linkCount = Math.floor(Math.random() * 3) + 1; // 首尾连接的数量
  allDistinctSeriesTagInfo.forEach((item: SeriesTagType, index: number) => {
    if (item.dataType === 'switch') {
      item.seriesData = RandomUtil.getSwitchData(1000);
    } else {
      const seriesData = RandomUtil.getSeriesData(1000);
      const baseLineData = JSON.parse(JSON.stringify(seriesData));
      // for (let i = 0; i < 100; i++) {
      //   baseLineData[i][1] = 100000;
      // }
      item.seriesData = seriesData;
      item.seriesLink = {
        isLinkMode: true,
        linkData: getRandomCountLinkData(linkCount)
      };
      // item.visualMapSeries = {
      //   pieces: [{ min: 5000, max: 8000 }],
      //   baseLine: {
      //     mode: 'below',
      //     value: baseLineData,
      //   }
      // };
    }
  });
  echartsLinkageRef.value?.updateAllEcharts(allDistinctSeriesTagInfo);
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

// 批量更新按钮---时间
const updateAllLinkageTimeBtnClick = () => {
  const allDistinctSeriesTagInfo: SeriesTagType[] = echartsLinkageRef.value?.getAllDistinctSeriesTagInfo() as SeriesTagType[];
  console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
  const res: { [key: string]: Array<number[]> } = {};
  allDistinctSeriesTagInfo.forEach((item: SeriesTagType, index: number) => {
    if (item.dataType === 'switch') {
      item.seriesData = RandomUtil.getSwitchData(1000);
    } else {
      item.seriesData = RandomUtil.getSeriesDataWithTime(1000);
    }
  });
  echartsLinkageRef.value?.updateAllEcharts(allDistinctSeriesTagInfo);
}


// 批量清除echarts实例数据
const clearAllEchartsData = () => {
  echartsLinkageRef.value?.clearAllEchartsData();
}

// 批量替换echarts实例数据
const replaceAllEchartsData = () => {
  const res: Array<OneDataType[]> = [];
  for (let i = 0; i < 4; i++) {
    const oneDataTypeArray: OneDataType[] = [];
    for (let j = 0; j < 5; j++) {
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
  echartsLinkageRef.value?.replaceAllEchartsData(res);
}

// 批量替换echarts实例数据-多卷
const replaceAllEchartsData1 = () => {
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

// 新增line-series按钮
const addLinkageLineSeriesBtnClick = () => {
  seriesType = 'line';
  addLinkageSeriesCommon(seriesType);
}

// 新增bar-series按钮
const addLinkageBarSeriesBtnClick = () => {
  seriesType = 'bar';
  addLinkageSeriesCommon(seriesType);
}

// 实时更新按钮--长度
let count = 0;
let mySetInterval: any = null;
const randomCount = 10;
const realTimeUpdateLengthBtnClick = () => {
  mySetInterval = setInterval(() => {
    const allDistinctSeriesTagInfo: SeriesTagType[] = echartsLinkageRef.value?.getAllDistinctSeriesTagInfo() as SeriesTagType[];
    console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
    allDistinctSeriesTagInfo.forEach((item: SeriesTagType, index: number) => {
      let seq = count;
      let imitate: Array<(number | string)[]> = [];
      if (item.dataType === 'switch') {
        imitate = RandomUtil.getSwitchData(randomCount);
      } else {
        imitate = RandomUtil.getSeriesData(randomCount);
      }
      imitate.forEach((item, index) => {
        seq++;
        item[0] = seq;
      });
      item.seriesData = imitate;
    });
    count += randomCount;
    // console.log("count", count);
    // console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
    echartsLinkageRef.value?.realTimeUpdate(allDistinctSeriesTagInfo);
  }, 2000);
}

// 实时更新按钮--时间
let countTime = 0;
let mySetIntervalTime: any = null;
const realTimeUpdateTimeBtnClick = () => {
  mySetIntervalTime = setInterval(() => {
    const allDistinctSeriesTagInfo: SeriesTagType[] = echartsLinkageRef.value?.getAllDistinctSeriesTagInfo() as SeriesTagType[];
    console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
    allDistinctSeriesTagInfo.forEach((item: SeriesTagType, index: number) => {
      let imitate: Array<(number | string)[]> = [];
      if (item.dataType === 'switch') {
        imitate = RandomUtil.getSwitchData(randomCount);
      } else {
        const startTime = new Date(new Date('2024-10-01 08:00:00').getTime() + countTime * 1000);
        imitate = RandomUtil.getSeriesDataWithTime(randomCount, undefined, undefined, startTime);
      }
      item.seriesData = imitate;
    });
    countTime += randomCount;
    console.log("count", countTime);
    console.log("allDistinctSeriesTagInfo", allDistinctSeriesTagInfo);
    echartsLinkageRef.value?.realTimeUpdate(allDistinctSeriesTagInfo, 50);
  }, 2000);
}

// 实时更新-关闭按钮
const realTimeUpdateCancelBtnClick = () => {
  clearInterval(mySetInterval);
  clearInterval(mySetIntervalTime);
}

// 下载图片
const downloadImg = () => {
  echartsLinkageRef.value?.downloadAllEchartsImg();
}

// 修改映射数据
const updateVisualMapBtnClick = () => {
  const allSeriesTagInfo: Array<{ id: string, series: Array<SeriesTagType> }> = echartsLinkageRef.value?.getAllSeriesTagInfo() as Array<{ id: string, series: Array<SeriesTagType> }>;
  console.log("allSeriesTagInfo", allSeriesTagInfo);
  const id = allSeriesTagInfo[0].id;
  const seriesName = allSeriesTagInfo[0].series[1].name;
  echartsLinkageRef.value?.updateOneEchartsVisualMapSeries(id, [{ seriesName: seriesName, pieces: [{ min: 1000, max: 3000 }] }]);
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
    // visualMapSeries: {
    //   pieces: [{ min: 5000, max: 8000 }],
    //   baseLine: {
    //     mode: 'below',
    //     value: baseLineData,
    //     isShowOnToolTip: true,
    //   }
    // },
    // 多卷首尾连接设置
    // seriesLink: {
    //   isLinkMode: true,
    //   linkData: [
    //     { label: 'P202410210001', data: RandomUtil.getSeriesData(1000) },
    //     { label: 'P202410210002', data: RandomUtil.getSeriesData(1000) },
    //     { label: 'P202410210003', data: RandomUtil.getSeriesData(1000) },
    //     { label: 'P202410210004', data: RandomUtil.getSeriesData(1000) },
    //   ]
    // },
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

// 删除echarts实例的回调事件
const deleteEchart = (data: DeleteEchartType) => {
  // id: 删除的实例id，remainCount: 剩余实例数量
  const { id, remainCount } = data;
}

// 监听拖拽事件
const initLisener = () => {
  const dragRectLine: HTMLElement = document.querySelector('.drag-rect-line') as HTMLElement;
  const dragRectBar: HTMLElement = document.querySelector('.drag-rect-bar') as HTMLElement;
  const dragSwitch: HTMLElement = document.querySelector('.drag-rect-switch') as HTMLElement;

  dragRectLine.addEventListener('dragstart', (e: DragEvent) => {
    console.log("dragstart");
    seriesType = 'line';
    e.dataTransfer!.setData('text', "123");
    e.dataTransfer!.dropEffect = 'move';
  });
  // dragRectBar.addEventListener('dragstart', (e: DragEvent) => {
  //   console.log("dragstart");
  //   seriesType = 'bar';
  //   e.dataTransfer!.setData('text', "123");
  //   e.dataTransfer!.dropEffect = 'move';
  // });
  // dragSwitch.addEventListener('dragstart', (e: DragEvent) => {
  //   console.log("dragstart");
  //   seriesType = 'line';
  //   e.dataTransfer!.setData('text', "123");
  //   e.dataTransfer!.dropEffect = 'move';
  //   switchFlag = true;
  // });
}

// 监听图形位置变化事件
const listenerGraphicLocation = (data: ListenerGrapicLocationType) => {
  console.log("listenerGraphicLocation", data);
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
  // addLotEmptyLinkageBtnClick();
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
    border-radius: 10px;
    padding: 8px 15px;
    background-image: linear-gradient(to right, #4286f4, #00b4d8);
    border: 1px solid #00b4d8;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #fff;
      font-size: 14px;
      line-height: 14px;
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
