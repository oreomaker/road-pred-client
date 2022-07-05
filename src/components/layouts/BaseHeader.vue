<template>
  <!-- 页面头部部分 -->
  <div class="header">
    <div class="logo">&nbsp;Logistic Management</div>
    <!-- 水平一级菜单 -->
    <div style="float: left">
      <el-menu
        class="tab-menu"
        mode="horizontal"
        text-color="black"
        active-text-color="#3989fa"
        :default-active="toIndex"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="(item, index) in itemList"
          :index="item.path"
          :key="index"
        >
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 用户图标部分 -->
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <el-icon><Avatar /></el-icon>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="change-pw">
                <el-icon><Lock /></el-icon>
                &nbsp;修改密码
              </el-dropdown-item>
              <el-dropdown-item command="log-out">
                <el-icon><Switch /></el-icon>
                &nbsp;注销
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "~/stores/store.ts";

export default {
  data() {
    return {
      username: "",
    };
  },
  computed: {
    toIndex() {
      // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
      return "/" + this.$route.path.split("/")[1];
    },
    itemList() {
      var role = useAuthStore().role;
      console.log(role + " store");
      return [
        { path: "/" + role, title: "首页" },
        { path: "/userinfo", title: "个人信息" },
        { path: "/about", title: "关于" },
      ];
    },
  },
  methods: {
    handleSelect(path) {
      this.$router.push({
        path: path,
      });
    },
    handleCommand(command) {
      if (command == "log-out") {
        // clear the auth store
        useAuthStore().token = "";
        useAuthStore().role = "";
        this.$router.push({
          path: "/login",
        });
      } else if (command == "change-pw") {
        // clear the auth store
        this.$router.push({
          path: "/change-pw",
        });
      }
    },
  },
  mounted() {
    this.username = useAuthStore().username;
  },
};
</script>

<style>
.header {
  height: 60px;
  width: 100%;
  background-color: white;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tab-menu {
  width: 500px;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
