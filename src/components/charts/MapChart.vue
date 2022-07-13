<template>
    <div class="map-container">
        <div id="localMap"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import initBingMap from '~/api/initMap.js'

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
const getChartsData = () => {
    axios
    .post('/api/history/filter/', {
        county: props.county,
        time: date.value,
    })
    .then((res) => {
        console.log("pins:")
        console.log(res);

        // addPins(res.data)
    })
    .catch((err) => {
        console.log(err);
    })
}
watch([props], () => {getChartsData();});
onMounted(() => {getChartsData();})

let map = reactive({})
const initMap = () => {
    map = new Microsoft.Maps.Map('#localMap', {
        credentials: 'Aoqy2mXrSBghBTiA1u_uB6zmWqcHfdVJn4Jq7M7l87XgYlA7I0ZLSH5AlR19LzdY',
        center: new Microsoft.Maps.Location(40.76737744930541, -73.98389818892902),
    });
}

const addPins = (booms) => {
    map.entities.clear();
    for (let e in booms) {
        let loc = new Location(e.latitude, e.longitude);
    
        var pin = new Microsoft.Maps.Pushpin(loc, {
            color: 'red', // 纯色图钉
        });
        map.entities.push(pin);
    }
}

onMounted(() => {
    initBingMap.init()
        .then((Microsoft) => {
            console.log(Microsoft)
            console.log("加载成功...")
            initMap();
    })
})
</script>

<style>
.map-container {
    width: 1000px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#localMap {
    height: 100%;
}
</style>