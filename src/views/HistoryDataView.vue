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
          <CalendarChart></CalendarChart>
        </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">

</script>

<style>
.month-container {
  padding: 20px 0;
}

.monthTip {
  margin-left: 40px;
}
</style>