<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/store";
import axios from "axios";

const router = useRouter();

const formRef = ref<FormInstance>();
// 表单数据
const form = reactive({
	username: "",
	password: "",
	birthday: "",
});

const rules = reactive<FormRules>({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入验证码", trigger: "blur" }],
	birthday: [{ required: false, trigger: "blur" }],
});

const submitForm = async (fromEl: FormInstance | undefined) => {
	if (!fromEl) return;
	console.log('login');
	// send username and pwd

	// redirect
	router.push('/home/map');
};

const goBack = () => {
	router.go(-1);
}

// demo：本地图片验证码引入
const getImageUrl = (name: string) => {
	return new URL(`../../assets/${name}`, import.meta.url).href;
}

</script>

<template>
	<el-card shadow="always">
		<template #header>
			<div class="card-header">
				<span>注册</span>
				<el-button @click="goBack" size="small">
					<el-icon>
						<Back />
					</el-icon>返回
				</el-button>
			</div>
		</template>
		<el-form ref="formRef" :model="form" :rules="rules" label-position="top" label-width="80px">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="密码" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="生日" prop="birthday">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="性别" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="邮箱" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="职责" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名">
					<template #suffix>
						<el-icon>
							<User />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="图片验证码" prop="password">
				<el-input v-model="form.password" placeholder="请输入验证码">
					<template #suffix>
						<el-icon>
							<Lock />
						</el-icon>
					</template>
				</el-input>
				<img :src="getImageUrl('validate.png')" />
			</el-form-item>

			<el-form-item label="邮箱验证码" prop="password">
				<el-input v-model="form.password" placeholder="请输入验证码">
					<template #suffix>
						<el-icon>
							<Lock />
						</el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm(formRef)">注册</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<style scoped>
.ep-card {
	height: 800px;
	width: 700px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
