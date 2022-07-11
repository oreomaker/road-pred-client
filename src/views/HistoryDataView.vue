<template>
    <base-layout>
        <map-chart></map-chart>
        <div class="right-container">
            <CalendarChart></CalendarChart>
            <bar-chart></bar-chart>
        </div>
    </base-layout>
</template>

<script setup lang="ts">

</script>

<style>
.ep-main {
    display: flex;
    justify-content: space-around;
    align-content: center;
}

.map-container {
    width: 1000px;
}

.right-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-around;
}
</style>