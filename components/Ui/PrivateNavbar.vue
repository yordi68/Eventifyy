<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Icon as IconifyIcon } from '@iconify/vue';
import { useAuthStore } from "~/stores/auth";
const { getUser, getTest, getFirstName, getLastName, getPhotoUrl } = useAuthStore();

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

                                                                        <span>{{ getFirstName }}</span>
                                                                        <span>{{ getLastName }}</span>
                                                                </div>
                                                                <img :src="getPhotoUrl" alt=""
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
