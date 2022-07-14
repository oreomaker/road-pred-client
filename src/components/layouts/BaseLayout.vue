<template>
    <el-container>
        <el-header>
            <base-header />
        </el-header>
        <el-container class="body-container">
            <el-aside width="200px" v-if="isLogin">
                <BaseSide></BaseSide>
            </el-aside>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from '~/store';

const store = useAuthStore();
const isLogin = computed(() => {
    return store.isLogin;
})
</script>

<style scoped>
.ep-header {
    padding: 0;
}
.ep-main {
    width: 100%;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>