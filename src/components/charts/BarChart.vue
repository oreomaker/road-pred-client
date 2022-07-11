<template>
    <div class="chart-wrapper">
        <v-charts :option="option" class="chart"></v-charts>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    VisualMapComponent,
    GridComponent,
    TitleComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import VCharts from 'vue-echarts';
import emmiter from '~/store/bus'

echarts.use([
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
    UniversalTransition
]);

// 取得柱状图数据
// TODO: 更改成请求数据
const getChartsData = (year: number, month: number, day: number) => {
    let rd1 = Math.floor(Math.random() * 100)
    let rd2 = Math.floor(Math.random() * 100)
    let rd3 = Math.floor(Math.random() * 100)
    let rd4 = Math.floor(Math.random() * 100)
    return [year / 1000 * rd1, month * rd2, day * rd3, 10 * rd4]
}
const year = ref(2017);
const month = ref(1);
const day = ref(1);
const chartsData = computed(() => {
    return getChartsData(year.value, month.value, day.value)
});
onBeforeMount(() => {
    emmiter.on('changeDay', (e) => {
        year.value = e.year;
        month.value = e.month;
        day.value = e.day;
    })
})
const title = computed(() => {
    return year.value + '年' + month.value + '月' + day.value + '日'; 
})

//echarts配置项
const option = ref({
    title: {
        text: title,
        left: 'center',
        top: '10',
    },
    tooltip: {
        position: 'top',
    },
    xAxis: {
        type: 'category',
        data: [1, 2, 3, 4],
    },
    yAxis: {
        type: 'value'
    },
    grid: {
        bottom: '30',
    },
    series: {
        type: 'bar',
        data: chartsData,
        showBackground: true,
        xAxisIndex: 0,
        yAxisIndex: 0,
    }
    
});
</script>

<style>
.chart-wrapper {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);;
    width: 400px;
    height: 330px;
}
</style>