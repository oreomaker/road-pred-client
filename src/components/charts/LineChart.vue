<template>
    <div class="chart-wrapper">
        <v-charts :option="option" class="chart"></v-charts>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkLineComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import VCharts from 'vue-echarts';
import axios from 'axios';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

const props = defineProps({
    year: {
        type: Number,
        require: true,
    },
    month: {
        type: Number,
        require: true,
    },
    day: {
        type: Number,
        default: 1
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
    .post('/api/history/fiveday/', {
        county: props.county,
        date: date.value,
    })
    .then((res) => {
        let dataX = [];
        let dataY = [];
        const now = new Date(props.year, props.month, props.day).getTime();
        const dayTime = 24 * 60 * 60 * 1000;
        for (let i = -2; i <= 2; i++) {
            const tmpDate = new Date(now + i * dayTime);
            const year1 = tmpDate.getFullYear();
            const month1 = tmpDate.getMonth();
            const day1 = tmpDate.getDate();
            dataX.push(year1+'-'+month1+'-'+day1)
            dataY.push(res.data.msg[i+2])
        }

        option.value.xAxis.data = dataX;
        option.value.series.data = dataY;
    })
    .catch((err) => {
        console.log(err)
    })   
}
watch([props], () => {getChartsData();});
onMounted(() => {getChartsData();})

const title = computed(() => {
    return props.year + '年' + props.month + '月' + props.day + '日' + '前后历史记录'; 
})

const option = ref({
    title: {
        text: title,
        left: '5',
        top: '10',
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '50',
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    visualMap: {
        show: false,
        pieces: [
          { gt: 0, lte: 5, color: '#93CE07' },
          { gt: 5, lte: 10, color: '#FBDB0F' },
          { gt: 10, lte: 15, color: '#FC7D02' },
          { gt: 15, lte: 20, color: '#FD0100' },
          { gt: 20, lte: 30, color: '#AA069F' },
          { gt: 30, color: '#AC3B2A' }
        ],
        outOfRange: { color: '#999' }
    },
    series: {
        type: 'line',
        data: [],
        markLine: {
            lineStyle: {
                color: '#333'
            },
            data: [
                { yAxis: 5 },
                { yAxis: 10 },
                { yAxis: 15 },
                { yAxis: 20 },
                { yAxis: 25 },
            ]
        }
    }
})
</script>

<style scoped>
.chart-wrapper {
    width: 100%;
}

</style>