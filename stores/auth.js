import { defineStore } from "pinia";
import getUser from "~/graphql/query/users/item.gql";
const { onLogout } = useApollo();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    id: null,
    role: null,
    user: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    photo_url: null,
    userFetchEnabled: false,
  }),
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
    getUser() {
      return this.user;
    },
    isFetchEnabled() {
      return this.userFetchEnabled;
    },
    getFirstName() {
      return this.first_name;
    },
    getLastName() {
      return this.last_name;
    },
    getEmail() {
      return this.email;
    },
    getPhoneNumber() {
      return this.phone_number;
    },
    getPhotoUrl() {
      return this.photo_url;
    },
  },
  actions: {
    enableFetchUser() {
      this.userFetchEnabled = true;
    },

    async fetchUser(id) {
      const { onResult, onError } = singleQuery(getUser, {
        id,
      });

      return new Promise((resolve, reject) => {
        onResult((result) => {
          this.first_name = result.data.users_by_pk.first_name;
          this.last_name = result.data.users_by_pk.last_name;
          this.email = result.data.users_by_pk.email;
          this.phone_number = result.data.users_by_pk.phone_number;
          this.photo_url = result.data.users_by_pk.photo_url;
          this.user = null;
          this.user = result.data.users_by_pk;

          resolve(true);
        });

        onError((error) => {
          reject(error);
        });
      });
    },
    setUser(user) {
      console.log("setting user", user);
      this.user = user;
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
  },
  persist: true,
});
