<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue"
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/store";
import axios from "axios";

const router = useRouter();

const formRef = ref<FormInstance>();
// 表单数据
const form = reactive({
	username: "",
	password: "",
});

const rules = reactive<FormRules>({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = async (fromEl: FormInstance | undefined) => {
	if (!fromEl) return;
	console.log('login');
	// send username and pwd

	// redirect
	router.push('/map');
};
</script>

<template>
	<el-card shadow="always">
		<template #header>
			<span>车辆事故等级预测系统</span>
		</template>
		<el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="80px">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input v-model="form.password" placeholder="请输入密码">
					<template #suffix>
						<el-icon>
							<Lock />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm(formRef)">登录</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<style scoped>
</style>
