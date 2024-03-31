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

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                </svg>


                                                <span>Home</span>

                                        </NuxtLink>
                                </li>




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
                                        <NuxtLink to="/user/following"
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
                                <li>
                                        <button @click="toggleModal"
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
