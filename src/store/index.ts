import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: "authentication",
    state: () => ({
        id: 0,
        username: "请先登录",
        first_name: "",
        last_name: "",
        isLogin: false,
        token: "",
        is_staff: false,
        email: "",
        // rowId: 0,
        avatar_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }),
    getters: {
        
    },
    actions: {

    },
});
