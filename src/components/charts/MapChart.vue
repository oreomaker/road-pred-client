<template>
    <div class="map-container">
        <div id="localMap"></div>
    </div>
</template>

<script setup>
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
        city: ''
    })
    .then((res) => {
        console.log(props.county)
        console.log(date.value)
        console.log("pins:")
        console.log(res);

        addPins(res.data)
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
    for (let e of booms) {
        let loc = new Microsoft.Maps.Location(e.latitude, e.longitude);
    
        var pin = new Microsoft.Maps.Pushpin(loc, {
            color: 'red', // 纯色图钉
        });
        map.entities.push(pin);
    }
}

onMounted(() => {
    initBingMap.initEnglish()
        .then((Microsoft) => {
            initMap();
    })
})
</script>

<style scoped>
#localMap {
    height: 100%;
}
</style>