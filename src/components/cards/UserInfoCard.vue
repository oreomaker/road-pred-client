<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { useAuthStore } from "~/store";
import axios from "axios";
import type { UserInfo } from "~/api/models";

const store = useAuthStore();

const userData = reactive<UserInfo>({
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
    date_joined: '',
    last_login: '',
});

axios
    .get('/api/user/latter/' + store.id + '/?token=' + store.token)
    .then(function (res) {
        console.log(res);
        if (res.data.code == 1) {
            userData.id = res.data.data.id;
            userData.username = res.data.data.username;
            userData.first_name = res.data.data.first_name;
            userData.last_name = res.data.data.last_name;
            userData.email = res.data.data.email;
            userData.is_staff = res.data.data.is_staff;
            userData.date_joined = res.data.data.date_joined;
            userData.last_login = res.data.data.last_login;
        }
        else {
            alert('数据获取失败')
        }
    })
    .catch(function (err) {
        console.log(err)
        alert('数据获取失败')
    })

const { id, username, email, is_staff, date_joined, last_login } = toRefs(userData);

const emit = defineEmits(['edit']);
const handleDetail = (id: number) => {
    emit('edit', id);
}
</script>

<template>
    <el-card>
        <el-descriptions title="用户信息" :column="3" border>
            <template #extra>
                <el-button @click="handleDetail(id)" size="small">
                    <el-icon>
                        <Edit />
                    </el-icon>修改
                </el-button>
            </template>
            <el-descriptions-item label="ID" :span="1">{{
                    id
            }}</el-descriptions-item>
            <el-descriptions-item label="用户名" :span="2">{{
                    username
            }}</el-descriptions-item>
            <el-descriptions-item label="类别" :span="1">{{
                    is_staff ? '管理员' : '普通用户'
            }}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱" :span="2">{{
                    email
            }}</el-descriptions-item>
            <el-descriptions-item label="注册日期" :span="3">{{
                    date_joined
            }}</el-descriptions-item>
            <el-descriptions-item label="上次登录" :span="3">{{
                    last_login
            }}</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<style scoped>
.ep-card {
    width: 800px;
}
</style>
