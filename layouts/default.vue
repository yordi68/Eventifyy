<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore()


</script>



<template>
        <main>
                <div v-if="authStore.isAuthenticated">
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