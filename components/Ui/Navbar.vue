<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Icon as IconifyIcon } from '@iconify/vue';
import { useUserStore } from "~/stores/auth";
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);







const userStore = useUserStore()
const navigation = [
        { name: 'Home', to: '/', current: true },
        { name: 'Events', to: '/events', current: false },
]

</script>

<template>


        <div class="fixed top-0 left-0 z-50 w-full">
                <Disclosure as="nav" class="bg-[#2D2C3C]" v-slot="{ open }">
                        <div class="w-full px-4 mx-auto md:h-20 sm:px-6 lg:px-32">
                                <div class="flex items-center h-full justify-evenly ">

                                        <div class="flex items-center justify-between w-full">
                                                <div data-test="website-logo">
                                                        <NuxtLink to="/">
                                                                <img src="/logo.png" alt="">
                                                        </NuxtLink>
                                                </div>


                                                <div class="items-center hidden space-x-12 text-white md:block">
                                                        <NuxtLink v-for="item in navigation" :key="item.name"
                                                                :to="item.to"
                                                                exact-active-class="text-extrabold text-[#FFE047] w-20">
                                                                {{ item.name }}
                                                        </NuxtLink>
                                                </div>
                                                <div v-if="userStore.isAuthenticated"
                                                        class="items-center justify-between hidden md:flex gap-x-3 ">
                                                        <div v-if="!isDark" class="p-1 hover:bg-gray-100">
                                                                <Icon name="material-symbols:light-mode"
                                                                        @click="toggleDark()"
                                                                        class="text-xl text-white cursor-pointer hover:text-black" />
                                                        </div>
                                                        <div v-else class="p-1 hover:bg-gray-600">

                                                                <Icon name="circum:dark" @click="toggleDark()"
                                                                        class="text-xl text-white cursor-pointer" />
                                                        </div>


                                                        <NuxtLink to="/user"
                                                                class="flex items-center space-x-2 text-white ">
                                                                <div class="space-x-2">

                                                                        <span>{{ userStore.first_name }}</span>
                                                                        <span>{{ userStore.last_name }}</span>
                                                                </div>
                                                                <img :src="userStore.photo_url" alt=""
                                                                        class="w-12 h-12 rounded-full dark:bg-gray-500">

                                                        </NuxtLink>
                                                </div>

                                                <div v-else class="items-center justify-between hidden md:flex gap-x-3">
                                                        <NuxtLink to="/login" class="text-white"
                                                                exact-active-class="text-extrabold text-[#FFE047] w-20">
                                                                <span>Login</span>
                                                        </NuxtLink>

                                                        <NuxtLink to="/sign-up">
                                                                <button
                                                                        class="bg-[#FFE047] !w-30 whitespace-nowrap px-4 py-2 rounded-md cursor-pointer">
                                                                        Sign Up
                                                                </button>
                                                        </NuxtLink>
                                                </div>
                                        </div>


                                        <div class="flex -mr-2 md:hidden">
                                                <!-- Mobile menu button -->
                                                <DisclosureButton
                                                        class="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span class="absolute -inset-0.5" />
                                                        <span class="sr-only">Open main menu</span>
                                                        <IconifyIcon :icon="open ? 'ic:round-close' : 'ic:round-menu'"
                                                                class="block w-6 h-6" aria-hidden="true" />
                                                </DisclosureButton>
                                        </div>
                                </div>
                        </div>

                        <DisclosurePanel class="p-8 sm:hidden">
                                <!-- new added -->
                                <div v-if="userStore.isAuthenticated">
                                        <NuxtLink to="/user"
                                                class="flex items-center gap-x-2  rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-[#FFE047] hover:text-white">
                                                <img :src="userStore.photo_url" alt=""
                                                        class="w-12 h-12 rounded-full dark:bg-gray-500">
                                                <div class="gap-x-2">

                                                        <span>{{ userStore.first_name }}</span>
                                                        <span>{{ userStore.last_name }}</span>
                                                </div>


                                        </NuxtLink>
                                </div>
                                <!-- bg-gray-700 -->


                                <div class="px-2 pt-2 pb-3 space-y-1">
                                        <NuxtLink v-for="item in navigation" :key="item?.name" :to="item?.to">
                                                <DisclosureButton :key="item?.name"
                                                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-[#FFE047] hover:text-white"
                                                        exact-active-class="text-extrabold text-[#FFE047]">
                                                        {{ item?.name }}
                                                </DisclosureButton>
                                        </NuxtLink>

                                </div>
                                <!-- hover:text-[#FFE047] -->
                                <div v-if="!userStore.isAuthenticated" class="flex items-center px-2 gap-x-3">
                                        <NuxtLink to="/login"
                                                class="flex text-white rounded-md px-3 py-2 gap-x-4 hover:bg-[#FFE047]"
                                                exact-active-class="text-extrabold text-[#FFE047] w-20">
                                                <div>

                                                        <Icon name="simple-line-icons:login" />
                                                </div>
                                                <div>

                                                        <span>Login</span>
                                                </div>
                                        </NuxtLink>

                                </div>
                        </DisclosurePanel>
                </Disclosure>
        </div>
</template>
