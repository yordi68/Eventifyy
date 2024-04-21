<script setup>
import addFollows from "~/graphql/mutations/follows/item.gql";
import { useUserStore } from "~/stores/auth";
import { toast } from "vue3-toastify";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import deleteEvent from '~/graphql/mutations/events/delete.gql';

let isCreator = ref(false);
let isOwner = false;
const isFollowed = true;
const userStore = useUserStore()
const emit = defineEmits(["refetch", "delete"])


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


if (userStore.isAuthenticated) {
        // console.log(props.event.user.id)
        if (props.event.user.id === userStore.id) {
                isCreator.value = true;
        }
}



/*------------------------- Deleting an Event ---------------------- */

const { mutate: deleteMutate, onDone: deleteDone, onError: deleteError } = anonymousMutation(deleteEvent, {
        clientId: "auth"
})

const handleDelete = () => {
        const id = props.event.id
        deleteMutate({ id })
}

deleteDone(() => {
        toast.success("You Deleted an event", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });
        emit("refetch")
})

deleteError(() => {
        toast.error("Error while delete this event", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });
})

const { mutate: followMutate, onDone: followDone, onError: followError, loading } = anonymousMutation(addFollows, {
        clientId: "auth"
});

const handleFollow = async () => {
        const input = {
                user_id: userStore.id,
                event_id: props.event.id
        }
        followMutate({ input });
}

followDone(() => {
        toast.success("You followed an event", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });
        emit("refetch")
})

followError((error) => {
        if (error.message.includes("duplicate")) {
                toast.error("You already followed this event", {
                        transition: toast.TRANSITIONS.FLIP,
                        position: toast.POSITION.TOP_RIGHT,
                });
                return;
        }

        toast.error("Something went wrong", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGH
        })
})

if (userStore && userStore.id && props.event && userStore.id === props.event.user.id) {
        isOwner = true;

}
const datetime = ref(props.event.time);

const formattedDateTime = computed(() => {
        const dateOptions = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

        const parsedDatetime = new Date(datetime.value);

        const formattedDate = parsedDatetime.toLocaleString('en-US', dateOptions).replace(',', '/');
        const formattedTime = parsedDatetime.toLocaleString('en-US', timeOptions);

        return { formattedDate, formattedTime }
});


// console.log(props.event)


</script>

<template>
        <div
                class="w-full aspect-square h-full bg-white border border-gray-200 rounded-lg shadow dark:text-white  dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                <div @click="$router.push(`/events/${event.id}`)">
                        <div class="relative">
                                <div class="absolute top-1.5 right-1.5 z-30 ">

                                        <Menu v-if="userStore.isAuthenticated">
                                                <MenuButton @click="$event.stopPropagation()">
                                                        <button
                                                                class="w-6 h-6 flex items-center justify-center p-1.5 box-content rounded-full bg-white text-black">
                                                                <Icon name="tabler:dots" class="rotate-90 text-xl" />
                                                        </button>
                                                </MenuButton>
                                                <MenuItems
                                                        class="absolute mt-1 overflow-hidden bg-white  rounded-md right-0">
                                                        <MenuItem v-slot="{ active }" v-if="!isCreator">
                                                        <button @click="$event.stopPropagation(); handleFollow()"
                                                                class="text-sm hover:bg-sky-600 py-1.5 hover:text-white w-full px-3 cursor-pointer flex items-center gap-x-1.5">
                                                                <icon name="lucide:plus" class="w-4 h-4" /> Follow
                                                        </button>
                                                        </MenuItem>
                                                        <MenuItem v-slot="{ active }" :disabled="!isOwner">
                                                        <button :disabled="!isOwner"
                                                                :title="!isOwner ? 'Not the owner' : ''"
                                                                :class="[!isOwner && '!cursor-not-allowed']"
                                                                @click="$event.stopPropagation(); $router.push(`/user/event/edit/${event.id}`)"
                                                                class="text-sm hover:bg-sky-600 py-1.5 hover:text-white w-full cursor-pointer flex items-center px-3 gap-x-1.5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor" class="w-4 h-4">
                                                                        <path stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg> Edit
                                                        </button>
                                                        </MenuItem>
                                                        <MenuItem v-slot="{ active }" :disabled="!isOwner">
                                                        <button :disabled="!isOwner"
                                                                :title="!isOwner ? 'Not the owner' : ''"
                                                                :class="[!isOwner && '!cursor-not-allowed']"
                                                                @click="$event.stopPropagation(); handleDelete()"
                                                                class="text-sm hover:bg-sky-600 py-1.5 hover:text-white w-full px-3 cursor-pointer flex items-center gap-x-1.5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke-width="1.5"
                                                                        stroke="currentColor" class="w-4 h-4">
                                                                        <path stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg> Delete
                                                        </button>
                                                        </MenuItem>

                                                </MenuItems>
                                        </Menu>
                                </div>
                                <img class="w-full aspect-square max-h-48 rounded-t-lg object-cover"
                                        :src="event.thumbnail" alt="" />
                        </div>
                        <div class="p-5 flex flex-col space-y-2">
                                <div class="flex items-center justify-between whitespace-nowrap ">
                                        <h5 class="text-wrap text-bold  text-md md:text-xl capitalize">
                                                {{ event.title }}
                                        </h5>
                                        <p class="w-max bg-[#FFE047] px-3 py-1 rounded-md text-neutral-800">
                                                <!-- {{ event.followers_count?.aggregate?.count }} Followers -->
                                                {{ event.total_follow }} Followers
                                        </p>
                                </div>

                                <div class="flex items-center space-x-3 text-sm  md:text-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                        <p>{{ formattedDateTime.formattedDate }}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        <p>{{ formattedDateTime.formattedTime }}</p>
                                        <div class="h-full bg-black w-px"></div>
                                        <p>{{ event.place }}</p>
                                </div>
                                <p>{{ event.date }}</p>
                                <span class="flex flex-col items-start  gap-3 ">
                                        <div class="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        fill="#008000" class="w-6 h-6">
                                                        <path
                                                                d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                                        <path fill-rule="evenodd"
                                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                                                                clip-rule="evenodd" />
                                                </svg>

                                                {{ event.price }}
                                        </div>
                                        <p class="line-clamp-2 font-light text-neutral-800 text-sm">
                                                {{ event.description }}
                                        </p>
                                        <div class="flex items-center gap-x-2 capitalize" v-if="event.user">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                        viewBox="0 0 24 24">
                                                        <circle cx="12" cy="6" r="4" fill="currentColor" />
                                                        <path fill="currentColor"
                                                                d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" />
                                                </svg>
                                                {{ event.user?.first_name }} {{ event.user?.last_name }}
                                        </div>
                                </span>

                        </div>
                </div>
        </div>
</template>
