# vue-echarts-linkage API说明

## 1. 组件属性
| 属性名 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| cols | `number` | 自定义配置的显示列数 | 1，即单列 |
| echarts-max-count | `number` | 允许的最大图表数 | 7 |
| empty-echart-count | `number` | 初始化生成的空白图表数 | — |
| echarts-colors | `string[]` | legend、series和对应Y轴颜色数组  | ['#0078FF', '#FFAA2E', '#00FF00', '#9D2EFF', '#DA1D80', '#DA4127'] |
| segment | `number / { mode: 'interval' / 'percent', value: number }` | 标线分段数, number表示分段数，object表示分段配置；当mode为'interval'时，value表示分段数，当mode为'percent'时，表示显示能被value整除的数值  | - |
| language | `zh-cn / en-us` | 语言设置，目前只支持中文（zh-cn）和英文（en-us）  | zh-cn，即中文 |
| grid-align | `boolean` | 多echarts图表是否对齐 | false |
| theme | `light / dark` | 主题，light为浅色，dark为深色 | light |
| background | `string` | 背景色，一般配合主题使用 | — |
| is-linkage | `boolean` | 是否联动 | true，即联动 |
| use-merged-legend | `boolean` | 是否使用合并图例 | true，即使用合并图例 |
| use-graphic-location | `boolean` | 是否使用图形定位 | false，即不使用图形定位 |
| is-echarts-height-change | `boolean` | 每个echarts图表高度是否可变 | true，即可变 |
| echarts-height-fixed-count | `boolean` | echarts高度固定数量，初始化时根据固定数量，计算每个echarts的固定高度，当is-echarts-height-change为false时生效 | 3 |
| extra-option | `{ [key: string]: any }` | 额外的echarts配置项，主要是grid、toolbox、xAxis等属性的合并；合并默认option，该优先级更高, 相同属性值进行合并, 不同属性值直接赋值 | — |
| groups | `Array<Array<number>>` | 分组属性，二维数组：第一维表示分组，第二维表示该分组下的chart序号（序号为正整数，并且不能重复） | — |

## 2. 组件事件
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| drop-echart | 拖拽图表回调事件，返回当前拖拽的图表id(data.id) | `(data: DropEchartType)` |
| delete-echart | 删除图表回调事件，返回当前删除的图表id(data.id) | `(data: DeleteEchartType)` |
| listener-graphic-location | 监听图形定位事件，返回所有图形定位信息 | `(data: ListenerGrapicLocationType)` |

## 3. 组件方法
| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| addEchart | 添加一个echarts图表 | `(data?: OneDataType / OneDataType[]) => void` |
| addEchartSeries | 新增echarts系列，一般配置拖拽回调事件（@drop-echart）使用 | `(id: string, data: OneDataType) => void` |
| deleteEchart | 根据echarts的id删除echarts | `(id: string) => Promise<void>` |
| getDataLength | 获取数据总数 | `() => number` |
| getMaxEchartsIdSeq | 获取最大的id序号 | `() => number` |
| getAllDistinctSeriesTagInfo | 获取所有不重复系列的标签信息 | `() => Array<SeriesTagType>` |
| getAllSeriesTagInfo | 获取所有系列的标签信息 | `(echartsId?: string) => Array<{ id: string; series: Array<SeriesTagType>; }>` |
| updateAllEcharts | 传入所有显示子项数据，更新所有echarts，一般配合 `getAllDistinctSeriesTagInfo()` 使用 | `(newAllSeriesdata: Array<SeriesTagType>) => Promise<void>` |
| clearAllEchartsData | 清空所有echarts数据：当mode为'clear'时，清除数据保留当前空白echarts实例，当mode为'delete'时，删除当前实例 | `(mode?: "clear" / "delete") => Promise<void>` |
| replaceAllEchartsData | 替换所有echarts，内部为先清除再添加，保证新旧echarts图表数量和数据不存在关联性 | `(newDataArray: Array<OneDataType[]>) => Promise<void>` |
| downloadAllEchartsImg | 下载包含所有echarts实例的图片 | `() => void` |
| realTimeUpdate | 新增实时数据更新 | `(allRealTimeData: Array<SeriesTagType>, limitCount?: number) => void` |
| updateOneEchartsVisualMapSeries | 更新单个echarts的visualMap数据，自定义每个series中不同报警区间，默认报警色为红色 | `(id: string, data: VisualMapSeriesType[] / VisualMapSeriesType) => void` |
| handleMultipleLinkData | 处理前后关联数据，多条关联数据进行首尾相连操作 | `(primaryData: OneDataType) => OneDataType` |
| changeAllEchartsTheme | 切换所有echarts图表主题 | `(theme: ThemeType) => void` |
| addExtraTooltip | 新增额外的提示框tooltip数据，如果id存在，则添加单个图表，否则添加所有图表 | `(extraTooltipData: Array<ExtraTooltipDataItemType>, id?: string) => void` |
| updateExtraTooltip | 更新额外的提示框tooltip数据，如果id存在，则更新单个图表，否则更新所有图表 | `(extraTooltipData: Array<ExtraTooltipDataItemType>, id?: string) => void` |
| clearExtraTooltip | 清除额外的提示框tooltip数据，如果id存在，则清除单个图表，否则清除所有图表 | `(id?: string) => void` |
| updateAllCustomContent | 更新所有图表的自定义容器内容 | `(htmls: string[]) => void` |
| updateAllCustomContentById | 更新所有图表的自定义容器内容，通过id更新 | `(params: CustomContentHtmlType[]) => void` |
| updateCustomContentById | 更新单个图表的自定义容器内容，通过id更新 | `(param: CustomContentHtmlType) => void` |
