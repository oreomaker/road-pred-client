import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "~/stores/store";

let store: any = null;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (store === null) {
    store = useAuthStore();
  }
  const isAuthenticated = store.token != "";
  if (!isAuthenticated && to.name !== "login") {
    // 将用户重定向到登录页面
    return { path: "/login" };
  }

  if (isAuthenticated && to.meta.auth == true) {
    if (to.meta.role != store.role) {
      return { path: "/" + store.role };
    }
  }
});

export default router;