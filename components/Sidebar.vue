<script setup>
import { useAuthStore, useUserStore } from "~/stores/auth";





const router = useRouter()
const { onLogout } = useApollo()
const { logout } = useAuthStore()
const userStore = useUserStore()


const isModalOpen = ref(false);

const toggleModal = () => {
        isModalOpen.value = !isModalOpen.value;
};

const closeModal = () => {
        isModalOpen.value = false;
};

const confirmDelete = () => {
        // Handle delete action here
        console.log("Delete confirmed!");
        closeModal(); // Close modal after confirming delete
};

const handleLogout = () => {
        onLogout('auth');
        userStore.$reset()
        navigateTo('/');
}


</script>









<template>
        <div v-if="isModalOpen" @click="closeModal" id="popup-modal" tabindex="-1"
                class="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/20">
                <div class="relative p-4 w-full max-w-md">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button @click="closeModal" type="button"
                                        class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="popup-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                </button>
                                <div class="p-4 md:p-5 text-center">
                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"
                                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                Are you sure you want to logout?</h3>
                                        <button @click="handleLogout" type="button"
                                                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                Yes, I'm sure
                                        </button>
                                        <button @click="closeModal" type="button"
                                                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                No, cancel
                                        </button>
                                </div>
                        </div>
                </div>
        </div>


        <div v-if="userStore.isAuthenticated"
                class="h-screen p-3 w-full space-y-2  text-white bg-[#2D2C3C] dark:text-gray-100">
                <div class="flex items-center  space-x-4 cursor-pointer" @click="router.push('/user')">
                        <img :src="userStore.photo_url" alt="" class="w-12 h-12 rounded-full dark:bg-gray-500">

                        <div>

                                <h2 class="text-lg font-semibold">{{ userStore.first_name }} {{ userStore.last_name }}
                                </h2>
                                <span class="flex items-center space-x-1">
                                        <span class="text-xs hover:underline dark:text-gray-400">View profile {{
                                                }}
                                        </span>
                                </span>
                        </div>
                </div>
                <div class=" flex flex-col justify-between h-[92%]  divide-y dark:divide-gray-700">
                        <ul class="pt-2 pb-4 space-y-1 text-sm">


                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/" class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">
                                                <Icon name="heroicons:home" class="w-6 h-6" />
                                                <span>Home</span>

                                        </NuxtLink>
                                </li>




                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/create-events"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">
                                                <Icon name="heroicons:plus-circle" class="w-6 h-6" />

                                                <span>Create Events</span>

                                        </NuxtLink>
                                </li>

                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/my-events"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">
                                                <Icon name="heroicons:calendar-days" class="w-6 h-6" />

                                                <span>My Events</span>

                                        </NuxtLink>
                                </li>

                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/booked-events"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">
                                                <Icon name="heroicons:book-open" class="w-6 h-6" />

                                                <span>Booked Events (Tickets)</span>

                                        </NuxtLink>
                                </li>


                                <li class="dark:bg-gray-800 dark:text-gray-50 hover:text-[#FFE047]">
                                        <NuxtLink to="/user/following"
                                                class="flex items-center p-2 space-x-3 rounded-md"
                                                exact-active-class="text-extrabold text-[#FFE047]">

                                                <Icon name="heroicons:heart" class="w-6 h-6" />

                                                <span>Following</span>

                                        </NuxtLink>
                                </li>

                        </ul>
                        <ul class="pt-4 pb-2 space-y-1 text-sm">
                                <li>
                                        <button @click="toggleModal"
                                                class="flex items-center p-2 space-x-3 rounded-md hover:text-[#FFE047]">
                                                <Icon name="heroicons-outline:logout" class="w-6 h-6" />
                                                <span>Logout</span>
                                        </button>
                                </li>
                        </ul>
                </div>
        </div>
</template>
