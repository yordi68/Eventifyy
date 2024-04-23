<template>
        <button @click="scrollToTop" v-if="isVisible"
                class="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-3 rounded-full dark:bg-[#FFE047] hover:bg-gray-900 focus:outline-none">
                <Icon name="heroicons:arrow-up" class="w-6 h-6 dark:text-black" />

        </button>
</template>


<script setup>

const isVisible = ref(false);

const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
}

const handleScroll = () => {
        if (window.scrollY > 800) {
                isVisible.value = true;
        } else {
                isVisible.value = false;

        }
}

onMounted(() => {
        window.addEventListener('scroll', handleScroll)
})


</script>
