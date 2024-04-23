<template>
        <div class="grid grid-cols-12 dark:bg-gray-800 dark:text-white">
                <div class="col-span-2 h-full">

                        <Sidebar />
                </div>
                <div class="col-span-12 lg:col-span-10 overflow-y-auto  w-full h-screen ">

                        <main class="overflow-y-auto py-6 sm:px-6 lg:px-8">

                                <slot />
                        </main>

                </div>
        </div>
</template>

<script setup></script>

<style></style>