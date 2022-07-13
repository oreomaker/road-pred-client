import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "~/store";

let store: any = null;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'home',
            component: () => import("../views/LoginView.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/forget-pwd",
            name: "forget-pwd",
            component: () => import("../views/ForgetPwdView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
        },
        {
            path: "/userinfo",
            name: "userinfo",
            component: () => import("../views/UserInfoView.vue"),
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/home/map",
            name: "map",
            component: () => import("../views/MapView.vue"),
        },
        {
            path: '/home/history',
            name: 'history-data',
            component: () => import("../views/HistoryDataView.vue")
        },
        {
            path: '/home/user',
            name: 'user-manage',
            component: () => import("../views/admin/UserManageView.vue")
        },
        {
            path: '/pred-history',
            name: 'pred-history',
            component: () => import("../views/PredHistoryView.vue")
        }
    ],
});

router.beforeEach(async (to, from) => {
    if (store === null) {
        store = useAuthStore();
    }
    const isAuthenticated = store.token != "";
    if (!isAuthenticated && to.name !== "login") {
        // 将用户重定向到登录页面
        // return { path: "/login" };
    }

    if (isAuthenticated && to.meta.auth == true) {
        if (to.meta.role != store.role) {
            return { path: "/" + store.role };
        }
    }
});

export default router;
