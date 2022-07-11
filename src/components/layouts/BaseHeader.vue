<template>
	<!-- 页面头部部分 -->
	<div class="header">
		<div class="logo">
			<h3>Road Accident Predict System</h3>
		</div>
		<!-- 水平一级菜单 -->
		<div class="menu-container" v-if="isLogin">
			<el-menu class="tab-menu" mode="horizontal" text-color="black" active-text-color="#3989fa"
				:default-active="toIndex" @select="handleSelect">
				<el-menu-item v-for="(item, index) in itemList" :index="item.path" :key="index" class="menu-item">
					{{ item.title }}
				</el-menu-item>
			</el-menu>
		</div>
		<!-- 用户图标部分 -->
		<div class="header-user">
			<!-- 用户头像 -->
			<div class="avatar-container">
				<el-avatar size="small" :src="store.avatar_url" />
			</div>
			<!-- 用户名下拉菜单 -->
			<el-dropdown class="user-name" trigger="hover" @command="handleCommand">
				<span class="el-dropdown-link">
					&nbsp;
					{{ username }}
					<el-icon  v-if="isLogin">
						<ArrowDown />
					</el-icon>
				</span>
				<template #dropdown v-if="isLogin">
					<el-dropdown-menu>
						<el-dropdown-item command="forget-pwd">
							<el-icon>
								<Lock />
							</el-icon>
							&nbsp;修改密码
						</el-dropdown-item>
						<el-dropdown-item command="log-out">
							<el-icon>
								<Switch />
							</el-icon>
							&nbsp;注销
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref,computed, onMounted } from "vue";
import { useAuthStore } from "../../store";
import { useRouter,useRoute } from "vue-router";

const store = useAuthStore();
const router = useRouter();
const route = useRoute();

const username = ref("");
const isLogin = ref(false)
const itemList = [
	{ path: "/home", title: "首页" },
	{ path: "/userinfo", title: "个人信息" },
	{ path: "/pred-history", title: "预测历史" },
	{ path: "/about", title: "关于" },
];

const toIndex = computed(() => {
	// 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
	return "/" + route.path.split("/")[1];
})

const handleSelect = (path: string) => {
	if(path == "/home"){
		console.log(path);
		router.push({
			path: "/home/map",
		});
	}
	else{
		router.push({
			path: path,
		});
	}
}

const handleCommand = (command: string) => {
	if (command == "log-out") {
		// clear the auth store
		useAuthStore().token = "";
		useAuthStore().role = "";
		router.push({
			path: "/login",
		});
	} else if (command == "forget-pwd") {
		// clear the auth store
		router.push({
			path: "/forget-pwd",
		});
	}
};

onMounted(() => {
	username.value = store.username;
	isLogin.value = store.isLogin;
})
</script>

<style scoped>
.header {
	height: 60px;
	width: 100%;
	background-color: white;
	padding: 0px;
	display: flex;
	align-items: center;
	justify-content: left;
	flex: 1 auto 1;
}

.logo {
	height: 100%;
	border-right: 1px solid #D3D3D3;
	padding: 0 10px;
}

.logo h3 {
	line-height: 100%;
}

.menu-container {
	min-width: 450px;
}

.menu-item {
	border-right: 1px solid #D3D3D3;
	width: 100px;
}

.header-user {
	margin-left: auto;
	border-left: 1px solid #D3D3D3;
	height: 100%;
	width: 130px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 5px;
}

.el-dropdown-link {
	cursor: pointer;
	display: flex;
	align-items: center;
}
</style>
