// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@ant-design-vue/nuxt",
    "nuxt3-leaflet",
    // "@nuxtjs/color-mode",
    "@vee-validate/nuxt",
    // "@vueuse/nuxt",
    "nuxt-icon",
    "@nuxtjs/apollo",
    "nuxt-headlessui",
    // "@nuxt/content",
    "@pinia/nuxt",
    "nuxt-primevue",
    // "nuxt-lodash",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  headlessui: {
    prefix: "Headless",
  },
  css: [
    "@/assets/css/main.css",
    "primevue/resources/themes/lara-light-green/theme.css",
  ],
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: "./apollo/anonymous.js",
      auth: "./apollo/authorized-client.js",
    },
  },
  primevue: {
    usePrimeVue: true,
    importPT: { as: "Tailwind", from: "primevue/passthrough/tailwind" },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
});
