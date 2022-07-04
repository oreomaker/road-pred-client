import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "authentication",
  state: () => ({
    counter: 0,
    username: "",
    token: "",
    role: "",
    phone: "",
    rowId: 0,
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
