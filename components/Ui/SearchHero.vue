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


<template>
        <div class="h-96 pt-20 bg-[#2D2C3C] flex flex-col items-center justify-center space-y-10">
                <h2 class="flex flex-col items-center gap-4 text-2xl font-bold text-center text-white md:text-5xl"
                        data-test="hero-search-page">
                        <span>Explore a world of events.</span>
                        <span> Find what excites you!</span>
                </h2>

                <div class="relative">
                        <!-- Search icon -->
                        <span class="absolute text-gray-400 left-3 top-3">
                                <icon class="iconify" name="bi:search" style="font-size: 1.2rem;"></icon>
                        </span>

                        <!-- Input field -->
                        <input type="text" v-model="searchQuery" @input="handleInput"
                                class="h-12 pl-10 pr-12 text-lg border-2 border-gray-300 rounded-md w-80 md:w-96 focus:outline-none focus:border-blue-500"
                                placeholder="Search..." data-test="event-page-search-input" />

                        <!-- Clear button -->
                        <span v-if="searchQuery" class="absolute text-gray-400 cursor-pointer right-3 top-3"
                                data-test="event-page-submit-button" @click="clearInput">
                                <icon class="iconify" name="bi:x-circle-fill" style="font-size: 1.2rem;"></icon>
                        </span>
                </div>
        </div>

</template>
