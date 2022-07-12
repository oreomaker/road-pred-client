<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { useAuthStore } from "~/store";
import axios from "axios";
import type { UserInfo } from "~/api/models";

const store = useAuthStore();

axios
    .get('/api/result/myresult/?' + store.token)
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.log(err)
        alert('数据获取失败')
    })

const userData = reactive<UserInfo>({
    name: "某客户",
    phone: "13888888888",
    address: "某地址",
    client_level: 1,
    identity_number: "123456789012345678",
});

const { name, phone, address, client_level, identity_number } = toRefs(userData);
</script>

<template>
    <el-card>
        <el-descriptions title="用户信息" :column="3" border>
            <el-descriptions-item label="姓名" :span="1">{{
                    name
            }}</el-descriptions-item>
            <el-descriptions-item label="电话" :span="2">{{
                    phone
            }}</el-descriptions-item>
            <el-descriptions-item label="客户等级" :span="1">{{
                    client_level
            }}</el-descriptions-item>
            <el-descriptions-item label="身份证号" :span="2">{{
                    identity_number
            }}</el-descriptions-item>
            <el-descriptions-item label="地址" :span="3">{{
                    address
            }}</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<style scoped>
.ep-card {
    width: 800px;
}
</style>
