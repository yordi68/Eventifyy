<script setup>


</script>



<template>
        <main class="relative dark:bg-gray-800 dark:text-white">
                <UiNavbar />
                <div>
                        <slot />
                        <ScrollToTop />
                </div>
                <Footer />
        </main>

</template>