<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import type { PredHistory } from "~/api/models";

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
let predHistoryList: PredHistory[] = [];

// await axios({
//     method: "get",
//     url: "http://localhost:8000/clients/",
// })
//     .then(function (response) {
//         console.log("client list");
//         console.log(response.data.results);
//         // isLoading.value = false;
//         predHistoryList = response.data.results;
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// const predHistoryData = ref<PredHistory[]>(predHistoryList);
// static data for test
const predHistoryData = ref<PredHistory[]>([
    {
        id: 1,
        request_time: "2022-07-07T00:01:16Z",
        latitude: 47.67683029174805,
        longitude: -122.1099624633789,
        temperature: 70,
        humidity: 40.0,
        visibility: 7.0,
        weather: 3,
        dawn_dusk: 1,
        severity: 3,
    },
    {
        id: 2,
        request_time: "2022-07-07T00:01:16Z",
        latitude: 47.67683029174805,
        longitude: -122.1099624633789,
        temperature: 70,
        humidity: 40.0,
        visibility: 7.0,
        weather: 3,
        dawn_dusk: 1,
        severity: 3,
    },
]);
const total = ref(predHistoryData.value.length);

// operating panel
const emit = defineEmits(['edit']);
const handleDetail = (id: number) => {
    emit('edit', id);
};
</script>

<template>
    <el-card shadow="always" stripe border>
        <!-- v-loading="isLoading" -->
        <el-table v-loading="isLoading" :data="predHistoryData" :default-sort="{ prop: 'name', order: 'ascending' }"
            stripe border>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="请求时间" prop="request_time"></el-table-column>
            <el-table-column label="纬度" prop="latitude"></el-table-column>
            <el-table-column label="经度" prop="longitude"></el-table-column>
            <el-table-column label="温度(℉)" prop="temperature" sortable></el-table-column>
            <el-table-column label="湿度" prop="humidity" sortable></el-table-column>
            <el-table-column label="可视度" prop="visibility" sortable></el-table-column>
            <el-table-column label="天气" prop="weather" sortable></el-table-column>
            <el-table-column label="昼夜" prop="dawn_dusk" sortable></el-table-column>
            <el-table-column label="事故严重程度" prop="severity" sortable></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="handleDetail(scope.row.id)">
                        编辑
                        <el-icon>
                            <i-ep-edit />
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" hide-on-single-page />
    </el-card>
</template>

<style scoped>
.ep-card {
    height: auto;
    width: 100%;
}
</style>