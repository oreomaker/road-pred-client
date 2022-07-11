<template>
    <el-drawer v-model="drawer" title="操作" direction="rtl" :before-close="handleClose">
        {{ rowId }}
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick">confirm</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const drawer = ref(false);
const rowId = ref(0);

// 将show方法向父组件开放
const show = (id: number) => {
    drawer.value = true;
    rowId.value = id;
}
defineExpose({show});

const handleClose = (done: () => void) => {
    //   ElMessageBox.confirm('Are you sure you want to close this?')
    //     .then(() => {
    //       done()
    //     })
    //     .catch(() => {
    //       // catch error
    //     })
    drawer.value = false
    console.log('close');
}
function cancelClick() {
    drawer.value = false
    console.log('cancel');
}
function confirmClick() {
    // ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    //     .then(() => {
    //         drawer2.value = false
    //     })
    //     .catch(() => {
    //         // catch error
    //     })
    drawer.value = false
    console.log('confirm');
}
</script>
<style>
    
</style>