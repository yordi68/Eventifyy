<script setup>


const searchQuery = ref('');

const handleInput = () => {
        // Handle input change
};

const clearInput = () => {
        // Clear input
};

// Background image style
const backgroundImageStyle = ref("url('/HeroImage.png')");

// Watch screen width and change background image and size accordingly
window.addEventListener('resize', () => {
        if (window.innerWidth <= 767) {
                backgroundImageStyle.value = "url('/HeroImage-mobile.png')";
                // Set background size to 290%
                document.querySelector('.bg-cover').style.backgroundSize = '250%';
        } else {
                backgroundImageStyle.value = "url('/HeroImage.png')";
                // Set background size to 170%
                document.querySelector('.bg-cover').style.backgroundSize = '170%';
        }
});

</script>



<template>
        <div class="relative flex flex-col items-center justify-start h-screen py-48 space-y-10 bg-black bg-center bg-cover lg:py-72"
                :style="{ backgroundImage: backgroundImageStyle }">

                <h1 class="w-10/12 text-2xl font-bold text-center text-white md:text-5xl text-wrap"
                        data-test="hero-heading">
                        Do not miss out!
                        Explore the <span class="text-[#FFE047]">vibrant events</span> happening locally and globally.
                </h1>
                <div class="relative">
                        <!-- Search icon -->
                        <span class="absolute text-gray-400 left-3 top-3">
                                <icon class="iconify" name="bi:search" style="font-size: 1.2rem;"></icon>
                        </span>

                        <!-- Input field -->
                        <input type="text" v-model="searchQuery" @input="handleInput" data-test="search-input"
                                class="h-12 pl-10 pr-12 text-lg border-2 border-gray-300 rounded-md w-80 md:w-96 focus:outline-none focus:border-blue-500"
                                placeholder="Search..." @keyup.enter="$router.push(`/events?search=${searchQuery}`)" />

                        <!-- Clear button -->
                        <!-- <span v-if="searchQuery" class="absolute text-gray-400 cursor-pointer right-3 top-3"
                                @click="clearInput">
                                <icon class="iconify" name="bi:x-circle-fill" style="font-size: 1.2rem;"></icon>
                        </span> -->
                        <button type="submit" v-if="searchQuery" @click="$router.push(`/events?search=${searchQuery}`)"
                                data-test="submit-button"
                                class="text-white absolute bg-[#FFE047]  end-2 bottom-1.5   hover:bg-[#2D2C3C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Search
                        </button>
                </div>
        </div>
</template>



<style scoped></style>
