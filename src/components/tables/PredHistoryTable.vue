<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store";
import axios from "axios";
import type { PredHistory } from "~/api/models";

const store = useAuthStore();

const isLoading = ref(true);
let predHistoryList: PredHistory[] = [];

axios
    .post('/api/result/myresult/', {
        email: store.email,
        username: store.username,
    })
    .then(function (res) {
        console.log(res);
        predHistoryList = res.data;
        isLoading.value = false;
    })
    .catch(function (err) {
        console.log(err)
        alert('数据获取失败')
    })

const predHistoryData = ref<PredHistory[]>(predHistoryList);

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