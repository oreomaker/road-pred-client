<template>
    <div class="chart-wrapper">
        <v-charts :option="option" class="chart"></v-charts>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
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
import axios from "axios";

echarts.use([
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
    UniversalTransition
]);

const props = defineProps({
    year: {
        require: true,
        type: Number,
    },
    month: {
        require: true,
        type: Number,
    },
    day: {
        require: true,
        type: Number,
    },
    county: {
        require: true,
        type: String,
    }
})

const date = computed(() => {
    let month = props.month+'';
    let day = props.day+'';
    if (month.length === 1)
        month = '0'+month;
    if (day.length === 1)
        day = '0'+day;
    return props.year+'-'+month+'-'+day;
})
// 取得柱状图数据
const getChartsData = () => {
    axios
    .post('/api/history/day/', {
        county: props.county,
        date: date.value,
    })
    .then((res) => {
        // console.log(props.county)
        // console.log(year+'-'+month+'-'+day)
        // console.log(res);
        option.value.series.data = res.data.msg;
    })
    .catch((err) => {
        console.log(err);
    })
}
watch([props], () => {getChartsData();});
onMounted(() => {getChartsData();})

const title = computed(() => {
    return props.year + '年' + props.month + '月' + props.day + '日'; 
})

//echarts配置项
const option = ref({
    title: {
        text: title,
        left: '3',
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
        data: [],
        showBackground: true,
        xAxisIndex: 0,
        yAxisIndex: 0,
    }
    
});
</script>

<style>

</style>