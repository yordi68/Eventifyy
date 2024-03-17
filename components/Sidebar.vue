<script setup>
import { useAuthStore } from "~/stores/auth";

const { user, logout } = useAuthStore()
// console.log(store.user.first_name)
console.log(user.photo_url);
</script>


<template>
        <div class="h-screen p-3 space-y-2  text-white bg-[#2D2C3C] dark:text-gray-100">
                <div class="flex items-center  space-x-4 cursor-pointer" @click="$router.push('/user')">
                        <img :src="user.photo_url" alt="" class="w-12 h-12 rounded-full dark:bg-gray-500">
                        <div>

                                <h2 class="text-lg font-semibold" :key="user">{{ user.first_name }} {{ user.last_name }}
                                </h2>
                                <span class="flex items-center space-x-1">
                                        <span class="text-xs hover:underline dark:text-gray-400">View profile
                                        </span>
                                </span>
                        </div>
                </div>
                <div class=" flex flex-col justify-between h-[92%]  divide-y dark:divide-gray-700">
                        <ul class="pt-2 pb-4 space-y-1 text-sm">

                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/create-events"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>

                                                <span>Create Events</span>

                                        </NuxtLink>
                                </li>

                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/my-events"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                </svg>

                                                <span>My Events</span>

                                        </NuxtLink>
                                </li>

                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/booked-events"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                                </svg>

                                                <span>Booked Events (Tickets)</span>

                                        </NuxtLink>
                                </li>


                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/bookmarks"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>

                                                <span>Following</span>

                                        </NuxtLink>
                                </li>

                        </ul>
                        <ul class="pt-4 pb-2 space-y-1 text-sm">
                                <!-- <li>
                                        <a rel="noopener noreferrer" href="#"
                                                class="flex items-center p-2 space-x-3 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        class="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path
                                                                d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z">
                                                        </path>
                                                        <path
                                                                d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z">
                                                        </path>
                                                </svg>
                                                <span>Settings</span>
                                        </a>
                                </li> -->
                                <li>
                                        <button @click="[logout(), navigateTo('/')]"
                                                class="flex items-center p-2 space-x-3 rounded-md hover:text-[#FFE047]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        class="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path
                                                                d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z">
                                                        </path>
                                                        <rect width="32" height="64" x="256" y="232"></rect>
                                                </svg>
                                                <span>Logout</span>
                                        </button>
                                </li>
                        </ul>
                </div>
        </div>
</template>