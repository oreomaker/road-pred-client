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
                user manage
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">

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