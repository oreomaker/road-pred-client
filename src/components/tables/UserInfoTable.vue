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
        id: 0,
        username: 'the elder',
        first_name: 'jiang',
        last_name: '',
        email: '',
        is_staff: false,
        date_joined: '1926',
        last_login: 'infinity',
    },
]);

const total = ref(clientData.value.length);

// operating panel
const emit = defineEmits(['edit']);
const handleDetail = (id: number, username: string, first_name: string, last_name: string) => {
    emit('edit', id, username, first_name, last_name);
}
</script>

<template>
    <el-card shadow="always" stripe border>
        <!-- v-loading="isLoading" -->
        <el-table v-loading="isLoading" :data="clientData" :default-sort="{ prop: 'name', order: 'ascending' }" stripe
            border>
            <el-table-column label="ID" prop="id" sortable></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="电子邮箱" prop="email"></el-table-column>
            <el-table-column label="类别" prop="is_staff"></el-table-column>
            <el-table-column label="注册日期" prop="date_joined" sortable></el-table-column>
            <el-table-column label="上次登录" prop="last_login" sortable></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" size="small" @click="handleDetail(scope.row.id, scope.row.username, scope.row.first_name, scope.row.last_name)">
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