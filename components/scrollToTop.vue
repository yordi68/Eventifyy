<template>
        <button @click="scrollToTop"
                class="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-3 rounded-full hover:bg-gray-900 focus:outline-none">
                <Icon name="heroicons:arrow-up" class="w-6 h-6" />

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
