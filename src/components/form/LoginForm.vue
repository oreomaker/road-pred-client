<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/store";
import axios from "axios";

const router = useRouter();

const formRef = ref<FormInstance>();
const form = reactive({
  username: "",
  phone: "",
  isRemember: false,
});
const role = ref(1);

const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
});
//"120105200606013298"
const submitForm = async (fromEl: FormInstance | undefined) => {
  if (!fromEl) return;

};
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <span>物流管理系统</span>
    </template>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名">
          <template #suffix>
            <i-ep-user />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号">
          <template #suffix>
            <i-ep-phone />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-radio-group v-model="role">
          <el-radio :label="1">用户</el-radio>
          <el-radio :label="2">快递员</el-radio>
          <el-radio :label="3">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="记住我" prop="isRemember">
        <el-switch v-model="form.isRemember"></el-switch>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped></style>
