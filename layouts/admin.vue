<template>
        <div class="grid grid-cols-12 h-fit overflow-hidden">
                <Sidebar class="col-span-2 h-full" />
                <div class="col-span-12 lg:col-span-10 h-full overflow-y-scroll">

                        <main>
                                <div class="mx-auto  py-6 sm:px-6 lg:px-8">
                                        <!-- <Nuvbar /> -->
                                        <slot />
                                </div>
                        </main>

                </div>
        </div>
</template>

<script setup></script>

<style></style>