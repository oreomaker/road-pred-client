<template>
    <div class="calendar-wrapper">
        <v-charts :option="option" @click="handleDayClicked" class="chart"></v-charts>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, reactive, onMounted } from "vue";
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
import axios from "axios";

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

const props = defineProps({
    year: {
        require: true,
        type: Number,
    },
    month: {
        require: true,
        type: Number,
    },
    county: {
        require: true,
        type: String,
    }
})

//取得日历图数据
function getCalendarData() {
    let data = []
    axios
    .post('/api/history/month/', {
        county: props.county,
        year: props.year+"",
        month: props.month+"",
    })
    .then((res) => {
        let date = +echarts.number.parseDate(props.year + '-' + props.month + '-01');
        let end = +echarts.number.parseDate(props.year + '-' + (props.month + 1) + '-01');
        let dayTime = 24 * 60 * 60 * 1000;
        for (let time = date, i = 0; time < end; time += dayTime, i++) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                res.data.msg[i]
            ]);
        }
        option.value.series.data = data;
    })
    .catch((err) => {
        console.log(err);
    })   
}

//日历图显示的月份
const range = ref(props.year.valueOf() + '-' + props.month.valueOf());
watch([props], () => {
    range.value = props.year.valueOf() + '-' + props.month.valueOf()
    option.value.calendar.range = props.year.valueOf() + '-' + props.month.valueOf()
    getCalendarData();
})
onMounted(() => {getCalendarData();})

//echarts配置项
const option = ref({
    tooltip: {
        position: 'top',
    },
    visualMap: {
        show: false
    },
    grid: {
        top: '5'
    },
    calendar: {
        orient: 'vertical',
        yearLabel: {
            show: false
        },
        dayLabel: {
            firstDay: 1,
            nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            margin: 5
        },
        monthLabel: {
            show: false
        },
        cellSize: 40,
        range: range.value,
        top: 28,
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
        data: []
    }
});

const emit = defineEmits(['change']);
//日期点击处理函数
const handleDayClicked = (params) => {
    if (params.componentSubType === 'heatmap') {
        let day = new Date(params.data[0]).getDate()
        emit('change', day);
    }
}

</script>

<style scoped>
.month-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.month-container span {
    line-height: 32px;
}

.calendar-wrapper {
    height: 280px;
}

</style>