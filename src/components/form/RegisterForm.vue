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
		<el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="130px">
			<el-form-item label="用户名" prop="name">
				<el-input 
					v-model="form.name" 
					placeholder="请输入用户名"
					:prefix-icon="User"
				></el-input>
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input 
					v-model="form.password" 
					placeholder="请输入密码"
					:prefix-icon="Lock"
				></el-input>
			</el-form-item>

			<el-form-item label="生日" prop="birthday">
				<el-date-picker
					v-model="form.birthday"
					type="date"
					placeholder="选择您的生日"
					size="default"
				/>
			</el-form-item>

			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="form.gender">
					<el-radio label="0">男</el-radio>
					<el-radio label="1">女</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="职责" prop="role">
				<el-radio-group v-model="form.role">
					<el-radio label="0">普通用户</el-radio>
					<el-radio label="1">管理员</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="图片验证码" prop="img_code">
				<div class="inline-form-item">
					<el-input 
						v-model="form.img_code" 
						placeholder="请输入验证码"
						:prefix-icon="Lock"
					></el-input>
					<img :src="img_url" @click="getImg" class="inline-form-item-suffix"/>
				</div>
			</el-form-item>

			<el-form-item label="邮箱" prop="email">
				<el-input 
					v-model="form.email" 
					placeholder="请输入邮箱"
					:prefix-icon="User"
				></el-input>	
			</el-form-item>

			<el-form-item label="邮箱验证码" prop="validator">
				<div class="inline-form-item">
					<el-input 
						v-model="form.validator" 
						placeholder="请输入验证码"
						:prefix-icon="Lock"
					></el-input>
					<el-button @click="getEmailValidator" class="inline-form-item-suffix inline-button">发送验证码</el-button>
				</div>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm(formRef)">注册</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store";
import axios from "axios";

const router = useRouter();

const formRef = ref<FormInstance>();
// 表单数据
const form = reactive({
	name: "", // 姓名
	password: "", // 密码
	birthday: "",    // 生日
	gender: "0", // 性别
	email: "", // 邮箱
	role: "0", // 职责（0，普通用户；1，管理员）
	img_code: "", // 用户输入的图片验证码
	validator: "", // 用户输入的邮箱验证码
});

const rules = reactive<FormRules>({
	name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	birthday: [{ required: false, trigger: "blur" }],
	gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
	email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
	role: [{ required: true, message: "请选择职责", trigger: "blur" }],
	img_code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
	validator: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});

const img_url = ref("")
const arrayBufferToBase64 = (buffer) => {
	var binary = ''
	var bytes = new Uint8Array(buffer)
	var len = bytes.byteLength
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	return window.btoa(binary)
}
const getImg = () => {
	axios
		.get('/api/user/former/generate/', {
			responseType: 'arraybuffer'
		})
		.then(function (res) {
			img_url.value = 'data:image/png;base64,' + arrayBufferToBase64(res.data)
		})
		.catch(function (err) {
			console.log(err)
		})
}
onMounted(() => {
	getImg()
})

const getEmailValidator = () => {
	if (form.email !== "") {
		axios
			.post('/api/user/former/send/', {
				to_email: form.email
			})
			.then(function (res) {
				console.log(res)
			})
			.catch(function (err) {
				console.log(err)
			})
	}
}

const submitForm = async (fromEl: FormInstance | undefined) => {
	if (!fromEl) return;
	console.log('login');

	console.log(form)
	// send username and pwd
	axios
		.post('/api/user/former/register/', form,)
		.then(function (res) {
			console.log(res)
		})
		.catch(function (err) {
			console.log(err)
		})

	// redirect
	router.push('/home/map');
};

const goBack = () => {
	router.go(-1);
}

</script>

<style scoped>
.ep-card {
	height: 600px;
	width: 800px;
	padding: 0 80px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.inline-form-item {
	display: flex;
}

.inline-form-item-suffix {
	margin-left: 20px;
}

.inline-button {
	width: 120px;
}
</style>
