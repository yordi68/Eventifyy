<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
        error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
        <div class="flex flex-col items-center py-48 justify-center">
                <div>
                        <img src="/error.svg" class="aspect-square max-h-48" />
                </div>
                <div class="space-y-4  items-center space-x-20">

                        <!-- <h2>{{ error?.statusCode }}</h2> -->
                        <p class="text-lg font-semibold">We couldn't fint the page you were looking for!</p>
                        <h2>{{ error }}</h2>
                        <!-- <button @click="handleError">Clear errors</button> -->
                        <NuxtLink to="/" class="text-2xl capitalize text-center ">
                                <button class="ml-20 flex bg-[#FFE047] rounded-md items-center py-4 px-6 ">
                                        Go back Home
                                </button>
                        </NuxtLink>

                </div>
        </div>
</template>
