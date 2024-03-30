<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore()
// console.log(authStore)
// console.log(authStore.isAuthenticated)
// // console.log(authStore.$id)
// console.log(authStore.user.first_name)
// console.log(authStore.user.last_name)
// console.log(authStore.user.token)


</script>



<template>
        <main class="relative">
                <div class="relative" v-if="authStore.isAuthenticated">
                        <UiPrivateNavbar />
                </div>
                <div v-else>
                        <UiPublicNavbar />
                </div>

              


                <div>
                        <slot />
                        <ScrollToTop />
                </div>
                <Footer />
        </main>

</template>