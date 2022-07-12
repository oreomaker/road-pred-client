import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: "authentication",
    state: () => ({
        counter: 0,
        username: "请先登录",
        isLogin: false,
        token: "",
        role: "",
        email: "",
        rowId: 0,
        avatar_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
    },
    actions: {
        increment() {
            this.counter++;
        },
    },
});
