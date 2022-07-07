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
          <div class="month-container">
            <span class="monthTip">请选择时间：</span>
            <el-date-picker
              v-model="year_month"
              type="month"
              placeholder="Pick a month"
              :default-value="year_month"
            />
          </div>
          <CalendarChart :year="year" :month="month"></CalendarChart>
        </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

let year_month = ref(new Date(2022, 0, 1))
let year = computed(() => {
  return year_month.value.getFullYear().toString();
})
let month = computed(() => {
  return (year_month.value.getMonth() + 1).toString();
})

</script>

<style>
.month-container {
  padding: 20px 0;
}

.monthTip {
  margin-left: 40px;
}
</style>