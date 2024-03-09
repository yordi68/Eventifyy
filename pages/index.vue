<template>

        <div>
                <UiHero />
                <div class="mx-24">
                        <h3 class="text-3xl font-bold my-4 pr-32">Popular Events</h3>
                        <div class="w-1/2 my-8 ">

                                <div class="flex items-center justify-start flex-wrap">
                                        <button type="button"
                                                class="text-black border border-white bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
                                                All
                                        </button>
                                        <button type="button"
                                                class="text-black border border-white bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
                                                Today
                                        </button>
                                        <button type="button"
                                                class="text-black border border-white bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
                                                Tommorrow
                                        </button>
                                        <button type="button"
                                                class="text-black border border-white bg-gray-200 hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
                                                This Weekend
                                        </button>

                                </div>
                        </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 md:mx-24 border border-red-500  ">
                        <div
                                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                        <img class="rounded-t-lg object-fit" src="/event-details-1.jpg" alt="" />
                                </a>
                                <div class="p-5 flex flex-col space-y-2">

                                        <h5 class="text-wrap text-bold  text-md md:text-xl">
                                                Noteworthy technology acquisitions 2021
                                        </h5>

                                        <div class="flex space-x-3 text-sm  md:text-md">
                                                <p>Nov 23 - 29 </p>
                                                <div class="h-full bg-black w-px"></div>
                                                <p>Chengapattu, India</p>
                                        </div>
                                        <p>7pm - 11pm</p>
                                        <span class="flex items-center  space-x-4 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em"
                                                        viewBox="0 0 36 36">
                                                        <path fill="#038212"
                                                                d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M4 26v-4.85A5.18 5.18 0 0 1 8.79 26Zm0-11.15V10h4.79A5.18 5.18 0 0 1 4 14.85m14 10.3c-3.47 0-6.3-3.21-6.3-7.15s2.83-7.15 6.3-7.15s6.3 3.21 6.3 7.15s-2.83 7.15-6.3 7.15M32 26h-4.75A5.18 5.18 0 0 1 32 21.15Zm0-11.15A5.18 5.18 0 0 1 27.25 10H32Z"
                                                                class="clr-i-solid clr-i-solid-path-1" />
                                                        <ellipse cx="18" cy="18" fill="#038212"
                                                                class="clr-i-solid clr-i-solid-path-2" rx="4"
                                                                ry="4.72" />
                                                        <path fill="none" d="M0 0h36v36H0z" />
                                                </svg>

                                                1200

                                        </span>
                                </div>
                        </div>


                        <div
                                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                        <img class="rounded-t-lg object-fit" src="/event-details-1.jpg" alt="" />
                                </a>
                                <div class="p-5 flex flex-col space-y-2">

                                        <h5 class="text-wrap text-bold  text-md md:text-xl">
                                                Noteworthy technology acquisitions 2021
                                        </h5>

                                        <div class="flex space-x-3 text-sm  md:text-md">
                                                <p>Nov 23 - 29 </p>
                                                <div class="h-full bg-black w-px"></div>
                                                <p>Chengapattu, India</p>
                                        </div>
                                        <p>7pm - 11pm</p>
                                        <span class="flex items-center  space-x-4 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em"
                                                        viewBox="0 0 36 36">
                                                        <path fill="#038212"
                                                                d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M4 26v-4.85A5.18 5.18 0 0 1 8.79 26Zm0-11.15V10h4.79A5.18 5.18 0 0 1 4 14.85m14 10.3c-3.47 0-6.3-3.21-6.3-7.15s2.83-7.15 6.3-7.15s6.3 3.21 6.3 7.15s-2.83 7.15-6.3 7.15M32 26h-4.75A5.18 5.18 0 0 1 32 21.15Zm0-11.15A5.18 5.18 0 0 1 27.25 10H32Z"
                                                                class="clr-i-solid clr-i-solid-path-1" />
                                                        <ellipse cx="18" cy="18" fill="#038212"
                                                                class="clr-i-solid clr-i-solid-path-2" rx="4"
                                                                ry="4.72" />
                                                        <path fill="none" d="M0 0h36v36H0z" />
                                                </svg>

                                                1200

                                        </span>
                                </div>
                        </div>

                        <div
                                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                        <img class="rounded-t-lg object-fit" src="/event-details-1.jpg" alt="" />
                                </a>
                                <div class="p-5 flex flex-col space-y-2">

                                        <h5 class="text-wrap text-bold  text-md md:text-xl">
                                                Noteworthy technology acquisitions 2021
                                        </h5>

                                        <div class="flex space-x-3 text-sm  md:text-md">
                                                <p>Nov 23 - 29 </p>
                                                <div class="h-full bg-black w-px"></div>
                                                <p>Chengapattu, India</p>
                                        </div>
                                        <p>7pm - 11pm</p>
                                        <span class="flex items-center  space-x-4 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em"
                                                        viewBox="0 0 36 36">
                                                        <path fill="#038212"
                                                                d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M4 26v-4.85A5.18 5.18 0 0 1 8.79 26Zm0-11.15V10h4.79A5.18 5.18 0 0 1 4 14.85m14 10.3c-3.47 0-6.3-3.21-6.3-7.15s2.83-7.15 6.3-7.15s6.3 3.21 6.3 7.15s-2.83 7.15-6.3 7.15M32 26h-4.75A5.18 5.18 0 0 1 32 21.15Zm0-11.15A5.18 5.18 0 0 1 27.25 10H32Z"
                                                                class="clr-i-solid clr-i-solid-path-1" />
                                                        <ellipse cx="18" cy="18" fill="#038212"
                                                                class="clr-i-solid clr-i-solid-path-2" rx="4"
                                                                ry="4.72" />
                                                        <path fill="none" d="M0 0h36v36H0z" />
                                                </svg>

                                                1200

                                        </span>
                                </div>
                        </div>





                </div>

        </div>


</template>

<script setup>
definePageMeta({
        layout: "public"
})

</script>