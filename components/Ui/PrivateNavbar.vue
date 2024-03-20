<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Icon as IconifyIcon } from '@iconify/vue';
import { useAuthStore } from "~/stores/auth";
const { user } = useAuthStore();

// const user = toRef(user)
const navigation = [
        { name: 'Home', to: '/', current: true },
        { name: 'Events', to: '/events', current: false },
        // { name: 'About', to: '#', current: false },
        // { name: 'Contact', to: '#', current: false },
]

</script>







<template>
        <div class="fixed w-full left-0 top-0 z-50">
                <Disclosure as="nav" class="bg-[#2D2C3C]" v-slot="{ open }">
                        <div class="mx-auto w-full  md:h-20 px-4 sm:px-6 lg:px-32">
                                <div class="flex h-full  items-center justify-evenly ">

                                        <div class="flex items-center justify-between w-full">
                                                <div>
                                                        <NuxtLink to="/">
                                                                <img src="/logo.png" alt="">
                                                        </NuxtLink>
                                                </div>


                                                <div class="hidden md:block  items-center space-x-12 text-white">
                                                        <NuxtLink v-for="item in navigation" :key="item.name"
                                                                :to="item.to"
                                                                exact-active-class="text-extrabold text-[#FFE047] w-20">
                                                                {{ item.name }}
                                                        </NuxtLink>
                                                </div>

                                                <div class="flex justify-between items-center space-x-3">
                                                        <!-- <NuxtLink to="/login" class="text-white"
                                                                exact-active-class="text-extrabold text-[#FFE047] w-20">
                                                                <span>Login</span>
                                                        </NuxtLink> -->

                                                        <NuxtLink to="/user"
                                                                class="flex text-white items-center space-x-2 ">
                                                                <div class="space-x-2">
                                                                        <span>{{ user?.first_name }}</span>
                                                                        <span>{{ user?.last_name }}</span>
                                                                </div>
                                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor"
                                                                        class="w-12 h-12 text-gray-200">
                                                                        <path stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg> -->
                                                                <img :src="user?.photo_url" alt=""
                                                                        class="w-12 h-12 rounded-full dark:bg-gray-500">




                                                        </NuxtLink>
                                                </div>
                                        </div>


                                        <div class="-mr-2 flex md:hidden">
                                                <!-- Mobile menu button -->
                                                <DisclosureButton
                                                        class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span class="absolute -inset-0.5" />
                                                        <span class="sr-only">Open main menu</span>
                                                        <IconifyIcon :icon="open ? 'ic:round-close' : 'ic:round-menu'"
                                                                class="block h-6 w-6" aria-hidden="true" />
                                                </DisclosureButton>
                                        </div>
                                </div>
                        </div>

                        <DisclosurePanel class="sm:hidden">
                                <div class="space-y-1 px-2 pb-3 pt-2">
                                        <NuxtLink v-for="item in navigation" :key="item?.name" :to="item?.to">
                                                <DisclosureButton :key="item?.name"
                                                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                                        exact-active-class="text-extrabold text-[#FFE047]">
                                                        {{ item?.name }}
                                                </DisclosureButton>
                                        </NuxtLink>
                                </div>
                        </DisclosurePanel>
                </Disclosure>
        </div>
</template>
