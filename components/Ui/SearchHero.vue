<template>
        <div class="h-96 pt-20 bg-[#2D2C3C] flex flex-col items-center justify-center space-y-10">
                <h2 class="text-white font-bold text-center text-2xl md:text-5xl flex flex-col items-center gap-4">
                        <span>Explore a world of events.</span>
                        <span> Find what excites you!</span>
                </h2>

                <div class="relative">
                        <!-- Search icon -->
                        <span class="absolute left-3 top-3 text-gray-400">
                                <icon class="iconify" name="bi:search" style="font-size: 1.2rem;"></icon>
                        </span>

                        <!-- Input field -->
                        <input type="text" v-model="searchQuery" @input="handleInput"
                                class="w-80 md:w-96 h-12 pl-10 pr-12 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Search..." />

                        <!-- Clear button -->
                        <span v-if="searchQuery" class="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                @click="clearInput">
                                <icon class="iconify" name="bi:x-circle-fill" style="font-size: 1.2rem;"></icon>
                        </span>
                </div>
        </div>

</template>
<!-- bg-[#2B293D] -->
<script setup>
import { ref } from 'vue';



const searchQuery = ref(useRoute().query.search || '');

function handleInput(event) {
        searchQuery.value = event.target.value;
        useRouter().push({ query: { search: searchQuery.value } })
        // Perform other input-related operations here if needed
}

function clearInput() {
        searchQuery.value = '';
        useRouter().push({ query: {} })
}
</script>