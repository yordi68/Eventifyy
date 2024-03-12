import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    id: null,
    role: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(id) {
      const { onResult, onError, refetch } = anonymousMutation(getUser, {
        id,
      });

      onResult((result) => {
        this.user = { ...result.data.users_by_pk };
      });

      onError((error) => {
        console.log(error);
      });
    },
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
    },
    // autoLogin(){
    //   let decoded = {};
    // }
  },
});
//yonas@99
