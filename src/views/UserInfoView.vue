<template>
    <el-container>
        <el-header>
            <base-header />
        </el-header>
        <el-main>
            <UserInfoCard @edit="handleEdit"></UserInfoCard>
            <UserManageDrawer ref="drawer"></UserManageDrawer>
        </el-main>
    </el-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
// drawer子组件事件
const drawer = ref({ show(id: number, username: string, first_name: string, last_name: string) { } });
const handleEdit = (id: number, username: string, first_name: string, last_name: string) => {
    console.log('emit');
    drawer.value.show(id, username, first_name, last_name);
}
</script>
<style scoped>
.ep-header {
    padding: 0;
}

.ep-main {
    display: flex;
    justify-content: center;
}
</style>