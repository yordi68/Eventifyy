import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useUserStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((from, to, next) => {
  const userStore = useUserStore();

  if (userStore.isAuthenticated) {
    return;
  } else {
    return navigateTo("/login");
  }
});
