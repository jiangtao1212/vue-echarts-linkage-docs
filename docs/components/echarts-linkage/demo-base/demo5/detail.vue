<template>
  <div class="btn-container">
    <el-button type="primary" size="small" @click="updateTemplateBtnClick()">模拟模板更新</el-button>
    <el-button type="primary" size="small" @click="updateTemplateBtnClick('template')">模拟模板更新（叠加）</el-button>
    <el-button type="primary" size="small" @click="getTemplateTagsOptionBtnClick">获取模板信息并更新</el-button>
    <div style="width: 5vw;"></div>
    <el-button type="primary" size="small" @click="replaceAllEchartsData">模拟非模板更新</el-button>
    <div style="width: 5vw;"></div>
    <div class="drag-rect drag-rect-line" draggable="true"><span>可拖拽折线系列</span></div>
  </div>
  <!-- 可自定义配置显示列数(cols) | 最大图表数(echarts-max-count) | 空白图表数(empty-echart-count) -->
  <VueEchartsLinkage ref="echartsLinkageRef" :cols="1" :echarts-max-count="10" language="zh-cn" grid-align
    :theme="theme" :use-graphic-location="false" :is-echarts-height-change="false" :echarts-height-fixed-count="2"
    @drop-echart="dropEchart" @listener-excel-view="listenerExcelView" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElButton } from 'element-plus';
import { RandomUtil } from "@/components/utils/index";
import { VueEchartsLinkage } from 'vue-echarts-linkage';
import type {
  OneDataType, DropEchartType,
  ListenerExcelViewType, excelViewType, excelViewHeadType, DragItemType
} from 'vue-echarts-linkage'
import "vue-echarts-linkage/dist/style.css";
import { MyTheme } from "@/composables/MyTheme";

const { theme } = new MyTheme();
const echartsLinkageRef = ref<InstanceType<typeof VueEchartsLinkage>>();
let seriesType = 'line' as 'line' | 'bar';
let switchFlag = false;

/**
 * @description 组装模板tag数据
 * @param mode 'template' | 'normal' 合并模式 | 普通模式
 * @returns 
 */
 const packageTemplateTagsArray = (mode: 'template' | 'normal') => {
  let templateTagsArray: Array<DragItemType[]> = [];
  if (mode === 'template') {
    const templateTags1 = [
      { name: 'STD1-波形1', id: '1', followId: '2', isDrag: true, isShow: false },
      { name: 'STD1-牌坊1', id: '2', followId: '2', isDrag: true, isShow: true },
      { name: 'STD1-电机1', id: '3', followId: '3', isDrag: true, isShow: true },
      { name: 'STD1-齿轮1', id: '4', followId: '3', isDrag: true, isShow: false },
    ] as DragItemType[];
    const templateTags2 = [
      { name: 'STD1-波形2', id: '1', followId: '2', isDrag: true, isShow: false },
      { name: 'STD1-牌坊2', id: '2', followId: '2', isDrag: true, isShow: false },
      { name: 'STD1-电机2', id: '3', followId: '3', isDrag: true, isShow: true },
      { name: 'STD1-齿轮2', id: '4', followId: '2', isDrag: true, isShow: false },
    ] as DragItemType[];
    const templateTags3 = [
      { name: 'STD1-波形3', id: '1', followId: '1', isDrag: true, isShow: true },
      { name: 'STD1-牌坊3', id: '2', followId: '3', isDrag: true, isShow: false },
      { name: 'STD1-电机3', id: '3', followId: '3', isDrag: true, isShow: true },
      { name: 'STD1-齿轮3', id: '4', followId: '4', isDrag: true, isShow: true },
    ] as DragItemType[];
    templateTagsArray = [templateTags1, templateTags2, templateTags3];
  } else {
    const templateTags1 = [
      { name: 'STD1-波形1', id: '1', followId: '1', isDrag: true, isShow: true },
      { name: 'STD1-牌坊1', id: '2', followId: '2', isDrag: true, isShow: true },
      { name: 'STD1-电机1', id: '3', followId: '3', isDrag: true, isShow: true },
      { name: 'STD1-齿轮1', id: '4', followId: '4', isDrag: true, isShow: true },
    ] as DragItemType[];
    const templateTags2 = [
      { name: 'STD1-波形2', id: '1', followId: '1', isDrag: true, isShow: true },
      { name: 'STD1-牌坊2', id: '2', followId: '2', isDrag: true, isShow: true },
      { name: 'STD1-电机2', id: '3', followId: '3', isDrag: true, isShow: true },
      { name: 'STD1-齿轮2', id: '4', followId: '4', isDrag: true, isShow: true },
    ] as DragItemType[];
    const templateTags3 = [
      { name: 'STD1-波形3', id: '1', followId: '1', isDrag: true, isShow: true },
      { name: 'STD1-牌坊3', id: '2', followId: '2', isDrag: true, isShow: true },
      { name: 'STD1-电机3', id: '3', followId: '3', isDrag: true, isShow: true },
      { name: 'STD1-齿轮3', id: '4', followId: '4', isDrag: true, isShow: true },
    ] as DragItemType[];
    templateTagsArray = [templateTags1, templateTags2, templateTags3];
  }
  return templateTagsArray;
}

// 模拟模板更新
const updateTemplateBtnClick = (mode: "template" | "normal" = 'normal') => {
  const templateTagsArray = packageTemplateTagsArray(mode);
  const res: Array<OneDataType[]> = [];
  for (let i = 0; i < templateTagsArray.length; i++) {
    const templateTags = templateTagsArray[i];
    const oneDataTypeArray: OneDataType[] = [];
    for (let j = 0; j < templateTags.length; j++) {
      const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
      const oneDataType: OneDataType = {
        name: templateTags[j].name,
        type: 'line',
        seriesData: RandomUtil.getSeriesData(1000),
        customData: `新增图表${maxEchartsIdSeq + 1}-${Math.floor(Math.random() * 1000)}`,
        xAxisName: '[m]',
        yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
        dragItemOption: templateTags[j],
      };
      oneDataTypeArray.push(oneDataType);
    }
    res.push(oneDataTypeArray);
  }
  echartsLinkageRef.value?.replaceAllEchartsData(res);
}

// 获取模板信息
const getTemplateTagsOptionBtnClick = () => {
  const templateTagsOption = echartsLinkageRef.value?.getTemplateTagsOption() as Array<Array<DragItemType>>;
  console.log("templateTagsOption", templateTagsOption);

  const res: Array<OneDataType[]> = [];
  for (let i = 0; i < templateTagsOption.length; i++) {
    const templateTags = templateTagsOption[i];
    const oneDataTypeArray: OneDataType[] = [];
    for (let j = 0; j < templateTags.length; j++) {
      const maxEchartsIdSeq = echartsLinkageRef.value!.getMaxEchartsIdSeq();
      const oneDataType: OneDataType = {
        name: templateTags[j].name,
        type: 'line',
        seriesData: RandomUtil.getSeriesData(1000),
        customData: `新增图表${maxEchartsIdSeq + 1}-${Math.floor(Math.random() * 1000)}`,
        xAxisName: '[m]',
        yAxisName: `[${Math.floor(Math.random() * 10) > 5 ? 'mm' : '℃'}]`,
        dragItemOption: templateTags[j],
      };
      oneDataTypeArray.push(oneDataType);
    }
    res.push(oneDataTypeArray);
  }
  echartsLinkageRef.value?.replaceAllEchartsData(res);
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
        // 无dragItemOption模板信息
      };
      oneDataTypeArray.push(oneDataType);
    }
    res.push(oneDataTypeArray);
  }
  echartsLinkageRef.value?.replaceAllEchartsData(res);
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
