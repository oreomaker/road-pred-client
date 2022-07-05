<template>
	<!-- 左侧二级菜单栏的组件封装 -->
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="toIndex" background-color="#fff" text-color="black" router>
			<el-menu-item index="map">
				<el-icon>
					<User />
				</el-icon>
				<template #title> &nbsp;事故预测 </template>
			</el-menu-item>
			<el-menu-item index="courier">
				<el-icon>
					<School />
				</el-icon>
				<template #title> &nbsp;快递员管理 </template>
			</el-menu-item>
			<el-menu-item index="cargo">
				<el-icon>
					<School />
				</el-icon>
				<template #title> &nbsp;订单管理 </template>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import { User, School } from "@element-plus/icons-vue"

export default {
	data() {
		return {};
	},
	computed: {
		toIndex() {
			// 根据路径绑定到对应的二级菜单，防止页面刷新重新跳回第一个
			return this.$route.path.split("/")[2];
		},
	},
	methods: {},
};
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
