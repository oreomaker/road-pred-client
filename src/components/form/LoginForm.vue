<template>
	<el-tabs type="border-card" stretch class="forms-tabs" v-model="form.flag">
		<el-tab-pane label="使用用户名登录" name="1">
			<el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="95px">
				<el-form-item label="用户名" prop="name">
					<el-input 
						v-model="form.name" 
						placeholder="请输入用户名"
						prefix-icon="User"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<div class="inline-form-item">
						<el-input 
							v-model="form.password" 
							type="password"
							placeholder="请输入密码"
							prefix-icon="Lock"
							show-password
						></el-input>
						<el-button @click="goToRegister" class="inline-form-item-suffix inline-button">忘记密码?</el-button>
					</div>
				</el-form-item>
				<el-form-item label="图片验证码" prop="kaptcha">
					<div class="inline-form-item">
						<el-input 
							v-model="form.kaptcha" 
							placeholder="请输入验证码"
							prefix-icon="Lock"
						></el-input>
						<img :src="img_url" @click="getImg" class="inline-form-item-suffix"/>
					</div>
				</el-form-item>
				<!-- 请求时添加默认值，通过结果判断，不参与实际功能 -->
				<!-- <el-form-item label="职责" prop="is_staff">
					<el-radio-group v-model="form.is_staff">
						<el-radio label="0">普通用户</el-radio>
						<el-radio label="1">管理员</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<div class="btn-container">
					<el-button type="primary" @click="submitForm(formRef)">登录</el-button>
					<el-button @click="register">注册</el-button>
				</div>
			</el-form>
		</el-tab-pane>
		<el-tab-pane label="使用邮箱登录" name="0">
			<el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="95px">
				<el-form-item label="邮箱" prop="name">
					<el-input 
						v-model="form.name" 
						placeholder="请输入邮箱"
						prefix-icon="Message"
					></el-input>
				</el-form-item>
				<el-form-item label="邮箱验证码" prop="validator">
					<div class="inline-form-item">
						<el-input 
							v-model="form.validator" 
							placeholder="请输入验证码"
							prefix-icon="Lock"
						></el-input>
						<el-button @click="getEmailValidator" class="inline-form-item-suffix inline-button">发送验证码</el-button>
					</div>
				</el-form-item>	
				<el-form-item label="图片验证码" prop="kaptcha">
					<div class="inline-form-item">
						<el-input 
							v-model="form.kaptcha" 
							placeholder="请输入验证码"
							prefix-icon="Lock"
						></el-input>
						<img :src="img_url" @click="getImg" class="inline-form-item-suffix"/>
					</div>
				</el-form-item>
				<!-- 请求时添加默认值，通过结果判断，不参与实际功能 -->
				<!-- <el-form-item label="职责" prop="is_staff">
					<el-radio-group v-model="form.is_staff">
						<el-radio label="0">普通用户</el-radio>
						<el-radio label="1">管理员</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<div class="btn-container">
					<el-button type="primary" @click="submitForm(formRef)">登录</el-button>
					<el-button @click="register">注册</el-button>
				</div>
			</el-form>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store";
import axios from "axios";

const router = useRouter();
const store = useAuthStore();

const formRef = ref<FormInstance>();
// 表单数据
const form = reactive({
	flag: "1",
	name: "",
	password: "",
	email: "",
	validator: "",
	kaptcha: "",
	is_staff: 0,
});

const rules = reactive<FormRules>({
	name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	email: [{required: true, message: '请输入邮箱', trigger: "blur"}],
	validator: [{required: true, message: '请输入邮箱验证码', trigger: "blur"}],
	kaptcha: [{required: true, message: '请输入验证码', trigger: "blur"}],
});

const img_url = ref("")
const arrayBufferToBase64 = (buffer: Iterable<number>) => {
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
	getImg();
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

const goToRegister = () => {
	router.push("/forget-pwd");
}

interface submitObj {
	[key: string]: any
}	
const submitForm = async (fromEl: FormInstance | undefined) => {
	if (!fromEl) return;
	console.log('login');
	
	const data = reactive<submitObj>({});
	if (form.flag === "0") {
		data.flag = +form.flag;   // 登录方式，1为“姓名加密码”，0为“邮箱”
    	data.email = form.name;    // 姓名
    	data.kaptcha = form.kaptcha;    // 用户输入的图形验证码
    	data.validator = form.validator;    // 用户输入的邮箱验证码
	}
	if (form.flag === "1") {
		data.flag = +form.flag;   // 登录方式，1为“姓名加密码”，0为“邮箱”
    	data.name = form.name;    // 姓名
    	data.password = form.password;    // 密码
    	data.kaptcha = form.kaptcha;    // 用户输入的图形验证码
	}
	console.log(data)

	// send username and pwd
	const res = axios
		.post('/api/user/former/login/', data)
		.then(function (res) {
			console.log(res)
			if(res.data.code == 1){
				store.id = res.data.data.id;
				store.token = res.data.token;
				store.username = res.data.data.username;
				store.first_name = res.data.data.first_name;
				store.last_name = res.data.data.last_name;
				store.email = res.data.data.email;
				store.is_staff = res.data.data.is_staff;
				store.isLogin = true;
				router.push('/home/map');
			}
			else {
				alert(res.data.msg);
			}
		})
		.catch(function (err) {
			console.log(err);
			alert('服务器错误，请稍后尝试');
		})
};

const register = () => {
	router.push('/register');
};
</script>

<style scoped>
.forms-tabs {
	width: 450px;
}

.btn-container {
	display: flex;
	justify-content: space-around;
}

.inline-form-item {
	display: flex;
}

.inline-form-item-suffix {
	margin-left: 10px;
}

.inline-button {
	width: 120px;
}
</style>
