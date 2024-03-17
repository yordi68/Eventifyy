<template>
        <div>
                <button type="button"
                        class="text-black border border-white bg-gray-200 whitespace-nowrap hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-sm py-1 text-center dark:text-white dark:focus:ring-gray-800 px-2">
                        {{ tagName }}
                </button>
        </div>


</template>

<script setup>
const props = defineProps({
        tagName: String
})

</script>