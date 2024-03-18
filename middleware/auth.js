import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((from, to, next) => {
  const store = useAuthStore();

  if (store.isAuthenticated) {
    return;
  } else {
    return navigateTo("/login");
  }
});
