<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "~/store";
import axios from "axios";
import type { PredHistory } from "~/api/models";

const store = useAuthStore();

const isLoading = ref(true);
const predHistoryData = ref<PredHistory[]>([]);
const total = ref(predHistoryData.value.length);
onMounted(() => {
    axios
        .get('/api/result/myresult/?token=' + store.token)
        .then(function (res) {
            console.log(res);
            predHistoryData.value = res.data;
            isLoading.value = false;
        })
        .catch(function (err) {
            console.log(err)
            alert('数据获取失败')
        })
});

// operating panel
const emit = defineEmits(['edit']);
const handleDetail = (id: number) => {
    emit('edit', id);
};
</script>

<template>
    <el-card shadow="always" stripe border>
        <!-- v-loading="isLoading" -->
        <el-table v-loading="isLoading" :data="predHistoryData" :default-sort="{ prop: 'name', order: 'ascending' }" height="800"
            stripe border>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="请求时间" prop="request_time" sortable></el-table-column>
            <el-table-column label="纬度" prop="latitude"></el-table-column>
            <el-table-column label="经度" prop="longitude"></el-table-column>
            <el-table-column label="温度(℉)" prop="temperature" sortable></el-table-column>
            <el-table-column label="湿度" prop="humidity" sortable></el-table-column>
            <el-table-column label="可视度" prop="visibility" sortable></el-table-column>
            <el-table-column label="天气" prop="weather" sortable></el-table-column>
            <el-table-column label="昼夜" prop="dawn_dusk" sortable></el-table-column>
            <el-table-column label="事故严重程度" prop="severity" sortable></el-table-column>
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