<template>
    <el-container>
        <el-header>
            <base-header />
        </el-header>
        <el-main>
            <PredHistoryTable @edit="handleEdit"></PredHistoryTable>
            <PredHistoryDrawer ref="drawer"></PredHistoryDrawer>
        </el-main>
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
<style scoped>
.ep-header {
    width: 100%;
    padding: 0;
}

.ep-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ep-main {
    width: 90%;
    display: flex;
    justify-content: center;
}
</style>