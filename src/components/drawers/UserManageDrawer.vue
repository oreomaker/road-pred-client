<template>
    <el-drawer v-model="drawer" title="操作" direction="rtl" :before-close="handleClose">
        <h2>用户名</h2>
        <el-input v-model="userName" placeholder="Please input" />
        <h2>Fist Name</h2>
        <el-input v-model="firstName" placeholder="Please input" />
        <h2>Last Name</h2>
        <el-input v-model="lastName" placeholder="Please input" />
        <div style="float: right; margin-top: 40px;">
            <el-button @click="deleteUser" type="danger" size="small" plain>
                注销用户
            </el-button>
        </div>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">修改</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "~/store";

const store = useAuthStore();

const drawer = ref(false);
const rowId = ref(0);
const userName = ref('');
const firstName = ref('');
const lastName = ref('');

// 将show方法向父组件开放
const show = (id: number, username: string, first_name: string, last_name: string) => {
    drawer.value = true;
    rowId.value = id;
    userName.value = username;
    firstName.value = first_name;
    lastName.value = last_name;
}
defineExpose({ show });

const handleClose = (done: () => void) => {
    let res = confirm('信息未提交，退出修改？');
    if (res) {
        drawer.value = false
        console.log('close');
    }
}
function cancelClick() {
    drawer.value = false
    console.log('cancel');
}
function confirmClick() {
    axios
        .put('/api/user/latter/' + rowId.value + '/?token=' + store.token, {
            username: userName.value,
            first_name: firstName.value,
            last_name: lastName.value,
        })
        .then(function (res) {
            console.log(res);
            alert(res.data.msg);
        })
        .catch(function (err) {
            console.log(err)
            alert('修改失败')
        })
    drawer.value = false
    console.log('confirm');
}

const deleteUser = () => {
    let res = confirm('请确认是否删除，该操作不可恢复？');
    if (res) {
        axios
            .delete('/api/user/latter/' + rowId.value + '/?token=' + store.token)
            .then(function (res) {
                console.log(res);
                alert(res.data.msg);
            })
            .catch(function (err) {
                console.log(err)
                alert('删除失败')
            })
        drawer.value = false;
    }
}
</script>
<style>
</style>