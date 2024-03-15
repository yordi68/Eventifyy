<script setup>
const props = defineProps({
        event: {
                type: Object,
                required: true
        },
        hasIcon: {
                type: Boolean,
                default: false
        }
})




</script>


<template>
        <div class=" flex justify-between space-x-6 items-center px-4 ">

                <div class="flex h-48 w-full  space-x-4">
                        <div class="h-full w-1/2">
                                <img :src="event.thumbnail" alt="random image" class="w-full h-full object-cover " />
                        </div>
                        <div class="flex flex-col py-3 space-y-2 justify-start items-start w-1/2">
                                <h4 class="text-wrap text-bold  text-md md:text-xl">
                                        {{ event.title }}
                                </h4>
                                <div class="flex-col  md:flex md:space-x-3 text-sm  md:text-md">
                                        <p>{{ event.time }}</p>
                                        <div class="hidden md:inline-block h-full bg-gray-400 w-px"></div>
                                        <!-- <p>{{ event.location.x_coordinate }} {{ event.location.y_coordinate }}</p> -->
                                </div>
                                <p>{{ event.date }}</p>
                                <span class="flex items-center  space-x-4 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em"
                                                viewBox="0 0 36 36">
                                                <path fill="#038212"
                                                        d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M4 26v-4.85A5.18 5.18 0 0 1 8.79 26Zm0-11.15V10h4.79A5.18 5.18 0 0 1 4 14.85m14 10.3c-3.47 0-6.3-3.21-6.3-7.15s2.83-7.15 6.3-7.15s6.3 3.21 6.3 7.15s-2.83 7.15-6.3 7.15M32 26h-4.75A5.18 5.18 0 0 1 32 21.15Zm0-11.15A5.18 5.18 0 0 1 27.25 10H32Z"
                                                        class="clr-i-solid clr-i-solid-path-1" />
                                                <ellipse cx="18" cy="18" fill="#038212"
                                                        class="clr-i-solid clr-i-solid-path-2" rx="4" ry="4.72" />
                                                <path fill="none" d="M0 0h36v36H0z" />
                                        </svg>

                                        {{ event.price }}
                                        {{ event.user.first_name }}
                                        {{ event.user.last_name }}

                                </span>
                        </div>
                        <Icon @click="$router.push(`/user/event/edit/${event.id}`)" v-if="hasIcon"
                                class="text-xl cursor-pointer" name="uil:edit" />
                </div>

        </div>
</template>
