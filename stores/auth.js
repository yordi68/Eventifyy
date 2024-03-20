import { defineStore } from "pinia";
import getUser from "~/graphql/query/users/item.gql";
const { onLogout } = useApollo();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    id: null,
    role: null,
    user: ref({}),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(id) {
      console.log("objectdasd", id);
      const { onResult, onError, refetch } = singleQuery(getUser, {
        id,
      });

      onResult((result) => {
        console.log(result, "result");
        this.user = { ...result.data.users_by_pk };
      });

      onError((error) => {
        console.log(error, "error");
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
      this.$reset();
    },
    // autoLogin(){
    //   let decoded = {};
    // }
  },
  persist: true,
});
