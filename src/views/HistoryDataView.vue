<template>
    <base-layout>
        <map-chart :year="year" :month="month" :day="day" :county="county"></map-chart>
        <div class="right-container">
            <div class="chart-container">
                <div class="data-item-container" id="searchBoxContainer">
                    <span>请选择区县：</span>
                    <input type='text' id='searchBox' placeholder="选择一个区县" class="county-input" />
                </div>
                <div class="data-item-container">
                    <span>请选择时间：</span>
                    <el-date-picker v-model="year_month" type="month" placeholder="选择一个月份" :default-value="year_month">
                    </el-date-picker>
                </div>
            </div>
            <div class="chart-container">
                <CalendarChart :year="year" :month="month" :county="county" @change="changeDay">
                </CalendarChart>
                <bar-chart :year="year" :month="month" :day="day" :county="county"></bar-chart>
            </div>
            <div id="line-chart">
                <line-chart :year="year" :month="month" :day="day" :county="county"></line-chart>
            </div>
        </div>
    </base-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import initBingMap from '~/api/initMap.js'

const county = ref('New York')
onMounted(() => {
    initBingMap.initEnglish().then((Microsoft) => {
        Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
            callback: () => {
                const options = { maxResults: 5 };
                const manager = new Microsoft.Maps.AutosuggestManager(options);
                manager.attachAutosuggest('#searchBox', '#searchBoxContainer', (suggestionResult: { address: { district: string; }; }) => {
                    console.log(suggestionResult);
                    county.value = suggestionResult.address.district.replace(' County', '');
                });
            }
        });
    });

})

//下拉菜单日期值
const year_month = ref<Date>(new Date(2021, 3, 1))
const year = computed(() => {
    console.log(year_month.value.getFullYear());
    return year_month.value.getFullYear();
})
const month = computed(() => {
    console.log((year_month.value.getMonth() + 1));
    return (year_month.value.getMonth() + 1);
})
const day = ref(1)
watch([year, month], () => {
    day.value = 1;
})

const changeDay = (newDay: number) => {
    day.value = newDay
}
</script>

<style scoped>
.map-container {
    width: 60%;
    height: 100%;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.right-container {
    width: 40%;
    height: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}

.chart-container {
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow-x: auto;
}

.data-item-container {
    width: 100%;
    margin: 7px auto;
    display: flex;
    justify-content: center;
}

.data-item-container span {
    line-height: 35px;
    width: 100px;
}

.county-input {
    width: 210px;
    height: 32px;
}

#line-chart {
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    height: 480px;
    justify-content: space-evenly;
    background-color: 0;
    overflow-x: auto;
}
</style>