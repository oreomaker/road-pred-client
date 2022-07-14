import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "~/store";

let store: any = null;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'home',
            component: () => import("../views/LoginView.vue"),
            meta: { auth: false },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
            meta: { auth: false },
        },
        {
            path: "/forget-pwd",
            name: "forget-pwd",
            component: () => import("../views/ForgetPwdView.vue"),
            meta: { auth: false },
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
            meta: { auth: false },
        },
        {
            path: "/userinfo",
            name: "userinfo",
            component: () => import("../views/UserInfoView.vue"),
            meta: { auth: true },
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
            meta: { auth: true },
        },
        {
            path: "/home/map",
            name: "map",
            component: () => import("../views/MapView.vue"),
            meta: { auth: true },
        },
        {
            path: '/home/history',
            name: 'history-data',
            component: () => import("../views/HistoryDataView.vue"),
            meta: { auth: true },
        },
        {
            path: '/home/user',
            name: 'user-manage',
            component: () => import("../views/admin/UserManageView.vue"),
            meta: { auth: true },
        },
        {
            path: '/pred-history',
            name: 'pred-history',
            component: () => import("../views/PredHistoryView.vue"),
            meta: { auth: true },
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    if (store === null) {
        store = useAuthStore();
    }
    if (to.path === '/login')  next()
    let isLogin = store.isLogin;
    if (!isLogin && to.meta.auth) {
        next({ path: '/login' })
    } else {
        console.log('ok')
        next()
    }
});

export default router;
