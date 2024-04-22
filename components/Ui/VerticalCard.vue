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
                                                                <Icon name="akar-icons:edit" class="w-4 h-4" />
                                                                Edit
                                                        </button>
                                                        </MenuItem>
                                                        <MenuItem v-slot="{ active }" :disabled="!isOwner">
                                                        <button :disabled="!isOwner"
                                                                :title="!isOwner ? 'Not the owner' : ''"
                                                                :class="[!isOwner && '!cursor-not-allowed']"
                                                                @click="$event.stopPropagation(); handleDelete()"
                                                                class="text-sm hover:bg-sky-600 py-1.5 hover:text-white w-full px-3 cursor-pointer flex items-center gap-x-1.5">
                                                                <Icon name="fluent:delete-48-regular" class="w-5 h-5" />
                                                                Delete
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
                                        <Icon name="heroicons:calendar-days" class="w-6 h-6" />
                                        <p>{{ formattedDateTime.formattedDate }}</p>
                                        <Icon name="heroicons:clock" class="w-5 h-5" />

                                        <p>{{ formattedDateTime.formattedTime }}</p>
                                        <div class="h-full bg-black w-px"></div>
                                        <p>{{ event.place }}</p>
                                </div>
                                <p>{{ event.date }}</p>
                                <span class="flex flex-col items-start  gap-3 ">
                                        <div class="flex">
                                                <Icon name="heroicons:currency-dollar-solid"
                                                        class="w-6 h-6 text-[#008000]" />

                                                {{ event.price }}
                                        </div>
                                        <p class="line-clamp-2 font-light text-neutral-800 text-sm">
                                                {{ event.description }}
                                        </p>
                                        <div class="flex items-center gap-x-2 capitalize" v-if="event.user">
                                                <Icon name="heroicons:user-20-solid" class="w-4 h-4" />
                                                {{ event.user?.first_name }} {{ event.user?.last_name }}
                                        </div>
                                </span>

                        </div>
                </div>
        </div>
</template>
