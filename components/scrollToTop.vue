<template>
        <button @click="scrollToTop"
                class="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-3 rounded-full hover:bg-gray-900 focus:outline-none">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>

        </button>
</template>


<script setup>
const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>



<!-- <script>
export default {
        methods: {
                scrollToTop() {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                }
        }
}
</script> -->
