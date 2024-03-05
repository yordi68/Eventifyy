<template>
        <button @click="scrollToTop"
                class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900 focus:outline-none">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="h-6 w-6 transform rotate-180">
                        <path fill-rule="evenodd"
                                d="M10 18a1 1 0 0 1-1-1V5.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L11 5.414V17a1 1 0 0 1-1 1z"
                                clip-rule="evenodd" />
                </svg>

        </button>
</template>


<script setup>
const scrollToTop = () => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
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
