<template>
    <div class="chart-wrapper">
        <div class="month-container">
            <span class="monthTip">请选择时间：</span>
            <el-date-picker v-model="year_month" type="month" placeholder="选择一个月份" :default-value="year_month" />
        </div>
        <v-charts :option="option" @click="handleDayClicked" class="chart"></v-charts>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeMount } from "vue";
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
import emmiter from '~/store/bus';

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
const year_month = ref(new Date(2017, 0, 1))
const year = computed(() => {
    return year_month.value.getFullYear();
})
const month = computed(() => {
    return (year_month.value.getMonth() + 1);
})

//取得日历图数据
// TODO: 更改成请求数据
function getCalendarData(year: number, month: number) {
    let date = +echarts.number.parseDate(year + '-' + month + '-01');
    let end = +echarts.number.parseDate(year + '-' + (month + 1) + '-01');
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
    return getCalendarData(year.value, month.value);
})

//日历图显示的月份
const range = ref(year.value + '-' + month.value);
watch(year_month, () => {
    range.value = year.value + '-' + month.value;
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
        cellSize: 45,
        range: range,
        top: 50,
        left: 'center',
    },
    series: {
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
    }
});

//日期点击处理函数
const handleDayClicked = (params) => {
    if (params.componentSubType === 'heatmap') {
        let day = new Date(params.data[0]).getDate()
        emmiter.emit('changeDay', {
            year: year.value, 
            month: month.value, 
            day: day,
        })
    }
}

</script>

<style scoped>
.month-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.month-container span {
    line-height: 32px;
}

.chart-wrapper {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);;
    width: 400px;
    height: 380px;
}

</style>