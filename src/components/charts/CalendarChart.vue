<template>
    <v-charts :option="option"></v-charts>
</template>
  
<script setup lang="ts">
import { ref, onUpdated, watch } from "vue";
import * as echarts from 'echarts/core';
import {
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    GridComponent
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
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
    CanvasRenderer,
    UniversalTransition
]);

const props = defineProps({
    year: {
        type: String,
        default: '2017'
    },
    month: {
        type: String,
        default: '2'
    },
})

function getVirtulData(year: string, month: string) {
    year = year || '2017';
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
const data = computed(() => {
    return getVirtulData(props.year, props.month);
})

let range = ref(props.year + '-' + props.month);
watch(props, () => {
    range.value = props.year + '-' + props.month;
})

const option = ref({
    visualMap: {
        show: false
    },
    grid: {
        
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
    dataset: {
        // source: 
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: data,
        label: {
            show: true,
            formatter: function (params) {
                return echarts.format.formatTime('dd', params.value[0]);
            },
            offset: [-10, -10],
            fontSize: 14
        },
    }
});

onUpdated(() => {
    console.log('year changed:' + range)
})

</script>

<style>

</style>