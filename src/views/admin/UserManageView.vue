<template>
    <el-container>
        <el-header>
            <base-header />
        </el-header>
        <el-container class="body-container">
            <el-aside width="200px">
                <BaseSide></BaseSide>
            </el-aside>

            <el-main>
                <UserInfoTable @edit="handleEdit"></UserInfoTable>
                <UserManageDrawer ref="drawer"></UserManageDrawer>
            </el-main>   
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
// drawer子组件事件
const drawer = ref({ show(id: number) { } });
const handleEdit = (id: number) => {
    console.log('emit');
    console.log(id);
    drawer.value.show(id);
}
</script>

<style>
.ep-header {
    padding: 0;
}

.ep-main {
    display: flex;
    flex-direction: row;
}
</style>