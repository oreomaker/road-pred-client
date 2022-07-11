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
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import { useAuthStore } from '~/store';

const store = useAuthStore();

const isLogin = computed(() => {
    return store.isLogin;
})
</script>

<style>
.ep-header {
    padding: 0;
}
</style>