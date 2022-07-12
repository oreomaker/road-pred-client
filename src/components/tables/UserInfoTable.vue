<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import type { UserInfo } from "~/api/models";
import { useAuthStore } from "~/store";

const store = useAuthStore();
const isLoading = ref(true);
let userList: UserInfo[] = [];

axios
    .get('/api/user/latter/?token=' + store.token)
    .then(function (res) {
        console.log(res);
        if (res.data.code == 1) {
            userList = res.data;
            isLoading.value = false;
        }
        else {
            alert(res.data.msg);
            isLoading.value = false;
        }
    })
    .catch(function (err) {
        console.log(err)
        alert('数据获取失败')
    })

const userData = ref<UserInfo[]>(userList);

const total = ref(userData.value.length);

// operating panel
const emit = defineEmits(['edit']);
const handleDetail = (id: number, username: string, first_name: string, last_name: string) => {
    emit('edit', id, username, first_name, last_name);
}
</script>

<template>
    <el-card shadow="always" stripe border>
        <el-table v-loading="isLoading" :data="userData" :default-sort="{ prop: 'name', order: 'ascending' }" stripe
            border>
            <el-table-column label="ID" prop="id" sortable></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="电子邮箱" prop="email"></el-table-column>
            <el-table-column label="类别" prop="is_staff"></el-table-column>
            <el-table-column label="注册日期" prop="date_joined" sortable></el-table-column>
            <el-table-column label="上次登录" prop="last_login" sortable></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" size="small"
                        @click="handleDetail(scope.row.id, scope.row.username, scope.row.first_name, scope.row.last_name)">
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