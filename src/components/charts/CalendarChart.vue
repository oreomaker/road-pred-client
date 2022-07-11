<template>
    <div class="chart-wrapper calendar">
        <div class="month-container">
            <span class="monthTip">请选择时间：</span>
            <el-date-picker v-model="year_month" type="month" placeholder="Pick a month" :default-value="year_month" />
        </div>
        <v-charts :option="option" @click="handleDayClicked"></v-charts>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from "vue";
import * as echarts from 'echarts/core';
import {
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent
} from 'echarts/components';
import { HeatmapChart, BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import VCharts from 'vue-echarts';
import { computed } from "@vue/reactivity";

echarts.use([
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent,
    HeatmapChart,
    BarChart,
    CanvasRenderer,
    UniversalTransition
]);

//下拉菜单日期值
let year_month = ref(new Date(2022, 0, 1))

//取得日历图数据
// TODO: 更改成请求数据
function getCalendarData(year: string, month: string) {
    let date = +echarts.number.parseDate(+year + '-' + +month + '-01');
    let end = +echarts.number.parseDate(+year + '-' + (+month + 1) + '-01');
    let dayTime = 24 * 60 * 60 * 1000;
    let data = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 100)
        ]);
    }
    return data;
}
const calendarData = computed(() => {
    return getCalendarData(year_month.value.getFullYear().toString(), (year_month.value.getMonth() + 1).toString());
})

// 取得柱状图数据
// TODO: 更改成请求数据
function getChartsDate(year: string, month: string, day: string) {
    return [+year / 100, +month, +day, 30]
}
let day = ref('1')
const chartsData = computed(() => {
    return getChartsDate(year_month.value.getFullYear().toString(), (year_month.value.getMonth() + 1).toString(), day.value);
})

//日历图显示的月份
let range = ref(year_month.value.getFullYear().toString() + '-' + (year_month.value.getMonth() + 1).toString());
watch(year_month, () => {
    range.value = year_month.value.getFullYear().toString() + '-' + (year_month.value.getMonth() + 1).toString();
})

//echarts配置项
const option = ref({
    tooltip: {
        position: 'top',
    },
    visualMap: {
        show: false
    },
    calendar: {
        orient: 'vertical',
        yearLabel: {
            show: false
        },
        dayLabel: {
            firstDay: 1,
            nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            margin: 20
        },
        monthLabel: {
            show: false
        },
        cellSize: 40,
        range: range,
        top: 50,
        left: 50
    },
    xAxis: [
        {
            type: 'category',
            data: [1, 2, 3, 4],
            gridIndex: 0
        }
    ],
    yAxis: [
        {
            type: 'value',
            gridIndex: 0
        }
    ],
    grid: [
        { left: '55%', bottom: '60%' },
    ],
    series: [
        {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            label: {
                show: true,
                formatter: function (params: { value: unknown[]; }) {
                    return echarts.format.formatTime('dd', params.value[0]);
                },
                offset: [-10, -10],
                fontSize: 14
            },
            data: calendarData
        },
        {
            type: 'bar',
            data: chartsData,
            showBackground: true,
            xAxisIndex: 0,
            yAxisIndex: 0,
        }
    ]
});

//日期点击处理函数
function handleDayClicked(params: { componentSubType: string; data: (string | number | Date)[]; }) {
    if (params.componentSubType === 'heatmap') {
        day.value = new Date(params.data[0]).getDate().toString()
        console.log(day.value)
    }
}

</script>

<style scoped>
.chart-wrapper {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);;
}

.calendar {
    width: 800px;
    height: 400px;
}
</style>