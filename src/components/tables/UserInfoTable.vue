<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import type { UserInfo } from "~/api/models";

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
let clientList: UserInfo[] = [];

// await axios({
//     method: "get",
//     url: "http://localhost:8000/clients/",
// })
//     .then(function (response) {
//         console.log("client list");
//         console.log(response.data.results);
//         // isLoading.value = false;
//         clientList = response.data.results;
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// const clientData = ref<Client[]>(clientList);

const clientData = ref<UserInfo[]>([
    {
        phone: '111',
        name: 'name',
        identity_number: 'identity',
        address: 'addres',
        client_level: 1,
    },
    {
        phone: '111',
        name: 'name',
        identity_number: 'identity',
        address: 'addres',
        client_level: 1,
    },
    {
        phone: '111',
        name: 'name',
        identity_number: 'identity',
        address: 'addres',
        client_level: 1,
    },
]);

const total = ref(clientData.value.length);

// operating panel
const emit = defineEmits(['edit']);
const handleDetail = (id: number) => {
    emit('edit', id);
}
</script>

<template>
    <el-card shadow="always" stripe border>
        <!-- v-loading="isLoading" -->
        <el-table v-loading="isLoading" :data="clientData" :default-sort="{ prop: 'name', order: 'ascending' }" stripe
            border>
            <el-table-column label="用户姓名" prop="name"></el-table-column>
            <el-table-column label="用户手机号" prop="phone"></el-table-column>
            <el-table-column label="用户地址" prop="address"></el-table-column>
            <el-table-column label="用户身份证号" prop="identity_number"></el-table-column>
            <el-table-column label="用户等级" prop="client_level" sortable></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="handleDetail(scope.row.phone)">
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