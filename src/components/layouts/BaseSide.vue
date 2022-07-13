<template>
	<!-- 左侧二级菜单栏的组件封装 -->
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="toIndex" background-color="#fff" text-color="black" router>
			<el-menu-item index="map">
				<el-icon>
					<TrendCharts />
				</el-icon>
				<template #title> &nbsp;事故预测 </template>
			</el-menu-item>
			<el-menu-item index="history">
				<el-icon>
					<List />
				</el-icon>
				<template #title> &nbsp;历史数据 </template>
			</el-menu-item>
			<el-menu-item index="user" v-if="store.is_staff">
				<el-icon>
					<UserFilled />
				</el-icon>
				<template #title> &nbsp;用户管理 </template>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from '~/store';

const store = useAuthStore();
const route = useRoute();

const toIndex = computed({
	get() {
		return route.path.split("/")[2];
	},
})
</script>

<style scoped>
/* 左侧菜单栏定位和位置大小设定 */
.sidebar {
	height: 100%;
	overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu {
	max-width: 400px;
}

.sidebar>ul {
	height: 100%;
}

/* 左侧二级菜单项的样式 */
.el-menu-item {
	font-size: 14px !important;
	padding-left: 35px !important;
}

/* 左侧二级菜单选中时的样式 */
.el-menu-item.is-active {
	color: white !important;
	background: #3989fa !important;
}

.el-menu-item,
.el-submenu__title {
	height: 50px !important;
	line-height: 50px !important;
}
</style>
