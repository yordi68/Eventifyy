import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    id: null,
    role: null,
    user: null,
  }),
  actions: {
    setUser(id) {},
    setToken(token) {
      this.token = token;
    },
    setId(id) {
      this.id = id;
    },
    setRole(role) {
      this.role = role;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.id = null;
      // Cookies.remove("auth_token")
    },
  },
});
//yonas@99
