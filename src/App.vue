<template>
    <el-config-provider namespace="ep">
        <RouterView></RouterView>
    </el-config-provider>
</template>

<style>
html,
body {
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    height: 100%;
    width: 100%;
    background-color: aliceblue;
}

* {
    box-sizing: border-box;
}

#app {
    height: 100%;
    display: flex;
    justify-content: space-around;
    color: var(--ep-text-color-primary);
}

.element-plus-logo {
    width: 50%;
}
</style>
