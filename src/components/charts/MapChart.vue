<template>
    <el-card class="map-container">
        <div id="localMap"></div>
    </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import initBingMap from '~/api/initMap.js'

let map = reactive({})
const initMap = () => {
    map = new Microsoft.Maps.Map('#localMap', {
        credentials: 'Aoqy2mXrSBghBTiA1u_uB6zmWqcHfdVJn4Jq7M7l87XgYlA7I0ZLSH5AlR19LzdY',
        center: new Microsoft.Maps.Location(40.76737744930541, -73.98389818892902),
    });
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
}

#localMap {
    height: 100%;
}
</style>