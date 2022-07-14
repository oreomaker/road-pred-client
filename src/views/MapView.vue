<template>
    <base-layout>
        <div class="map-container">
            <div id="localMap"></div>
        </div>
        <div class="right-container">
            <el-card class="level-pred-container">
                <template #header>
                    <el-icon><Stopwatch /></el-icon>&nbsp;
                    <span>单点事故等级预测</span>
                </template>
                <div class="data-item-container">
                    <span>请选择日期：</span>
                    <el-date-picker v-model="date" type="date" placeholder="选择一个日期" format="YYYY-MM-DD">
                    </el-date-picker>
                </div>
                <div class="data-item-container">
                    <span>请选择时间：</span>
                    <el-radio-group v-model="dawn_dusk" class="day-night">
                        <el-radio label="0">白天</el-radio>
                        <el-radio label="1">夜晚</el-radio>
                    </el-radio-group>
                </div>
                <div class="data-item-container">
                    <el-button @click="getPredictResult" type="primary">预测等级</el-button>
                    <el-button @click="clearPins">清除标点</el-button>
                </div>
                <div class="data-item-container">
                    <span>预测等级: {{ predResult }}</span>
                </div>
            </el-card>
            <el-card class="navi-pred-container">
                <template #header>
                    <el-icon><MapLocation /></el-icon>&nbsp;
                    <span>高危地点预警</span>
                </template>
                <div class="data-item-container">
                    <span>选择预测的日期：</span>
                    <el-select v-model="dateRes" placeholder="选择一个日期">
                        <el-option v-for="date in dateOpts" :key="date.value" :label="date.label" :value="date.value" />
                    </el-select>
                </div>
                <div class="data-item-container">
                    <span>选择预测的时间：</span>
                    <el-select v-model="timeRes" placeholder="选择一个时间">
                        <el-option v-for="time in timeOpts" :key="time.value" :label="time.label" :value="time.value" />
                    </el-select>
                </div>
                <div class="data-item-container">
                    <el-button @click="drawNav"  type="primary" style="width: 156px;">显示预测结果</el-button>
                    <el-button @click="clearNav" style="width: 156px;">清空地图界面</el-button>
                </div>
                <div id="printoutPanel"></div>
            </el-card>
        </div>
    </base-layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
import initBingMap from '~/api/initMap.js'
import axios from 'axios';
import { useAuthStore } from '~/store';

const store = useAuthStore();

let map = {}
onMounted(() => {
    initBingMap.init()
        .then((Microsoft) => {
            map = new Microsoft.Maps.Map('#localMap', {
                credentials: 'Aoqy2mXrSBghBTiA1u_uB6zmWqcHfdVJn4Jq7M7l87XgYlA7I0ZLSH5AlR19LzdY',
                center: new Microsoft.Maps.Location(40.76737744930541, -73.98389818892902),
            });
            Microsoft.Maps.Events.addHandler(map, 'click', clickMark);
        })
})

const clickMark = (e) => {
    console.log(e);
    const loc = new Microsoft.Maps.Location(e.location.latitude, e.location.longitude);

    const startTitle = "起点";
    const endTitle = "终点";

    //Add the pushpin to the map
    if (map.entities.getLength() === 0) {
        var pin = new Microsoft.Maps.Pushpin(loc, {
            color: 'red', // 纯色图钉
            draggable: true,
        });
        map.entities.push(pin);
    }
    else if (map.entities.getLength() === 1) {
        const tmp = map.entities.pop();
        const pin1 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(tmp.geometry.y, tmp.geometry.x), {
            color: 'red', // 纯色图钉
            draggable: true,
            title: startTitle
        })
        map.entities.push(pin1);
        console.log(tmp);

        var pin = new Microsoft.Maps.Pushpin(loc, {
            color: 'red', // 纯色图钉
            draggable: true,
            title: endTitle,
        });
        map.entities.push(pin);
    }
}

const date = ref(new Date());
const dateParam = computed(() => {
    return date.value.getFullYear() + '-' + date.value.getMonth() + '-' + date.value.getDate();
})
const dawn_dusk = ref('0');
const predResult = ref(0);
const getPredictResult = () => {
    console.log(map.entities.getLength())
    if (map.entities.getLength() !== 1) {
        ElMessage.error('使用预测功能时，地图上仅允许存在一个标点！')
    } else {
        const pin = map.entities.get(0);
        axios
            .post('/api/result/predict/?token=' + store.token, {
                latitude: pin.geometry.y,
                longitude: pin.geometry.x,
                date: dateParam.value,
                dawn_dusk: dawn_dusk.value,
            })
            .then((res) => {
                console.log(res);
                predResult.value = res.data.msg;
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
const clearPins = () => {
    map.entities.clear();
}

let directionsManager = {}
const drawNav = () => {
    console.log('test');
    if (map.entities.getLength() === 2) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
            directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
            // Set Route Mode to driving
            directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });

            const loc2 = map.entities.get(1).getLocation();
            const loc1 = map.entities.get(0).getLocation();

            directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ location: loc1 }));
            directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ location: loc2 }));
            // Set the element in which the itinerary will be rendered
            directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
            directionsManager.calculateDirections();
        });
        getNavigate();
    } else {
        clearNav();
        drawNav();
    }
}

const dateOpts = computed(() => {
    const now = new Date();
    console.log(now.getHours());
    const dayTime = 24 * 60 * 60 * 1000;
    const res = [];
    for (let i = 0; i < 5; i++) {
        let date = new Date(now.getTime() + dayTime * i);
        res.push({
            value: i + '',
            label: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        })
    }
    return res;
})
const timeOpts = computed(() => {
    const res = []
    if (dateRes.value === '0') {
        const now = new Date();
        for (let i = now.getHours() + 1; i < 24; i++) {
            res.push({
                value: i + '',
                label: i + ':00-' + (i + 1) + ':00',
            })
        }
    } else {
        for (let i = 0; i < 24; i++) {
            res.push({
                value: i + '',
                label: i + ':00-' + (i + 1) + ':00',
            })
        }
    }
    return res;
})
const dateRes = ref('0');
const timeRes = ref('');
const getNavigate = () => {
    const pin2 = map.entities.get(1).getLocation()
    const pin1 = map.entities.get(0).getLocation()

    axios
        .post('/api/result/navigate/?token=' + store.token, {
            lat1: pin1.latitude,
            lng1: pin1.longitude,
            lat2: pin2.latitude,
            lng2: pin2.longitude,
            day: dateRes.value,
            hour: timeRes.value,
        })
        .then((res) => {
            console.log(res);
            addPins(res.data.msg);
        })
        .catch((err) => {
            console.log(err);
        })
}
const clearNav = () => {
    directionsManager.clearDisplay();
    map.entities.clear();
}

const addPins = (booms) => {
    map.entities.clear();
    for (let i of booms) {
        let loc = new Microsoft.Maps.Location(i[0], i[1]);

        console.log(loc);

        var pin = new Microsoft.Maps.Pushpin(loc, {
            color: 'red', // 纯色图钉
        });
        map.entities.push(pin);
    }
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

.data-item-container {
    display: flex;
    justify-content: center;
    margin-bottom: 6px;
}

.data-item-container span {
    line-height: 32px;
}

.day-night {
    width: 219px;
}

.level-pred-container {
    width: 100%;
    height: 260px;
    overflow-y: auto;
}

.navi-pred-container {
    width: 100%;
    margin-top: 20px;
}

#printoutPanel {
    display: flex;
    justify-content: space-around;
    height: 360px;
    background-color: whitesmoke;
    overflow-y: auto;
}
</style>