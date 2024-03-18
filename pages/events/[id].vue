<script setup>
import getEvent from "~/graphql/query/events/item.gql";
import addFollows from "~/graphql/mutations/follows/item.gql";
import addBookmarks from "~/graphql/mutations/bookmarks/item.gql";
import insertTicketMutation from "~/graphql/mutations/tickets/InsertOne.gql"
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import deleteBookmark from "~/graphql/mutations/bookmarks/delete.gql";









const store = useAuthStore();
const route = useRoute();
const event = ref({});
let isFollowed = false;
let isBookmarked = false;
const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
// console.log("object", route.params.id)

const { onResult, onError, refetch } = singleQuery(getEvent, {
    id: route.params.id,
    clientId: "auth"
});

onResult((result) => {
    if (result.data.events_by_pk) {
        event.value = result.data.events_by_pk;
        const eventLocation = event.value.location
    }

    // console.log("this is fetching in events page", result.data)
})
onError((error) => {
    console.log(error, "error");
})



const { mutate: followMutate, onDone: followDone, onError: followError, loading } = anonymousMutation(addFollows, {
    clientId: "auth"
});

const { mutate: insertTicket, onDone: insertTicketDone, onError: insertTicketError, loading: insertTicketLoading } = anonymousMutation(insertTicketMutation, {
    clientId: "auth"
})



const handleFollow = async () => {
    const input = {
        user_id: store.user.id,
        event_id: event.value.id
    }
    followMutate({ input });
}

const handleInsetTicket = async () => {
    const input = {
        user_id: store.user.id,
        event_id: event.value.id
    }

    insertTicket({ input })
}


insertTicketDone(() => {
    openModal()
})


insertTicketError((error) => {
    if (error.message.includes("duplicate")) {
        toast.error("You already bought a ticket for this event", {
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

followDone(() => {
    toast.success("You followed an event", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
    refetch();
    isFollowed = true;
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







/*----------------------------- Adding BookMark Mutation -------------------------------- */
const { mutate: bookmarkMutate, onDone: bookmarkDone, onError: bookmarkError } = anonymousMutation(addBookmarks, {
    clientId: "auth"
});

const handleBookmark = async () => {
    const input = {
        user_id: store.user.id,
        event_id: event.value.id
    }
    bookmarkMutate({ input });

}

bookmarkDone(() => {
    toast.success("You bookmarked an event", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
    isBookmarked = true;
    refetch();
    // bookmarkRefetch();
})

bookmarkError((error) => {
    if (error.message.includes("duplicate")) {
        toast.error("You already bookmarked this event", {
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
        });
        return;
    }

    toast.error("Something went wrong", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT
    })
})




/*----------------------------------- Delete BookMark Mutation -------------------------------- */

const { mutate: deleteBookmarkMutate, onDone: deleteBookmarkOnDone, onError: deleteBookmakeOnError } = anonymousMutation(deleteBookmark, {
    clientId: "auth"
})


const handleDeleteBookmark = () => {
    const input = {
        event_id: event.value.id,
        user_id: store.user.id
    }
    deleteBookmarkMutate({ input })
}

deleteBookmarkOnDone(() => {
    toast.success("You removed this event from bookmarks", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
    isBookmarked = false;
    refetch();
})

deleteBookmakeOnError((error) => {
    toast.error("Something went wrong while deleting from bookmark", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT
    })
    console.log(error)
})


</script>










<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-yellow-300 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                You have bought a ticket
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    We're thrilled that you've purchased our ticket! We can't wait to see you at the
                                    event and share the excitement together
                                </p>
                            </div>

                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-[#2D2C3C] px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Got it, thanks!
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <div class="px-8 space-y-12 mt-28 mb-6" v-if="event">
        <div class="grid grid-cols-2 gap-x-16 ">
            <div class="w-full ">
                <img :src="event.thumbnail" alt="random image"
                    class="w-full rounded-lg shadow-lg max-h-[420px] object-cover " />
                <div class="grid grid-cols-3  gap-x-4">
                    <div class="py-4" v-for="media in event.event_medias">

                        <img :src="media.media.url" class=" rounded-2xl overflow-hidden object-cover h-full">
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-y-6">
                <div class="flex justify-between">
                    <h3 class="font-bold text-4xl">{{ event.title }}</h3>
                    <div class="flex gap-x-2" v-if="store.isAuthenticated">
                        <button @click.stop="handleDeleteBookmark()" v-if="isBookmarked">
                            <Icon name="mdi:bookmark" class="text-2xl text-[#ffe04a]" Color="#ffe04a" />
                        </button>
                        <button @click.stop="handleBookmark()" v-else>
                            <Icon name="iconoir:bookmark" class="text-2xl" />
                        </button>

                        <button @click.stop=" handleFollow()" v-if="isFollowed">
                            <icon name="ph:heart" class="text-2xl text-black " />
                        </button>
                        <button @click.stop=" handleFollow()" v-else>
                            <icon name="ph:heart-fill" class="text-2xl text-[#ffe04a] " Color="#ffe04a" />
                        </button>
                        <p class="w-max bg-[#FFE047] flex items-center justify-center text-white px-3  rounded-md ">
                            {{ event.followers_count?.aggregate?.count }} followers
                        </p>
                    </div>

                </div>
                <div class="flex gap-x-12">
                    <div class="space-y-1">
                        <h3 class="text-xl font-semibold">Date and Time</h3>
                        <div class="flex  gap-x-6">
                            <div class="flex space-x-2">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                <p>{{ new Date(event.time).toDateString() }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p>{{ new Date(event.time).toLocaleTimeString() }}</p>

                            </div>

                        </div>
                    </div>
                    <div class="space-y-1">
                        <h3 class="text-xl font-semibold">Ticket Information</h3>
                        <div class="flex space-x-2">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                            </svg>
                            <p>
                                Standard Ticket: {{ event.price }} each
                            </p>
                        </div>
                    </div>
                </div>


                <div class="w-full space-y-1 ">
                    <h3 class="text-xl font-semibold">Event Description</h3>
                    <p>
                        {{ event.description }}
                        <!-- In this version, both start and end dates are returned as Date objects. The end of the month and
                        the end of the year are adjusted to the last millisecond of the respective periods, hence the
                        addition of 23, 59, 59, 999 to the end of month and end of year calculations. This ensures that
                        the end timestamp effectively marks the end of the respective time period.
                        addition of 23, 59, 59, 999 to the end of month and end of year calculations. This ensures that
                        the end timestamp effectively marks the end of the respective time period. addition of 23, 59, -->

                    </p>
                </div>
                <div class="space-y-1">
                    <h3 class="text-xl font-semibold">Tags</h3>
                    <div class="flex items-center gap-x-4 justify-start flex-wrap">
                        <UiTag v-for="tag in event.tags" :key="tag.id" :tagName="tag.tag.name" />

                    </div>

                </div>
                <div class="flex items-center justify-between">
                    <div class="space-y-2">
                        <h3 class="text-xl font-semibold">Hosted by</h3>
                        <div v-if="event.user">
                            <div class="flex gap-x-4 items-center justify-evenly">
                                <div>
                                    <img class="w-16 object-cover h-16 mb-3 rounded-full shadow-lg"
                                        :src="event.user.photo_url" alt="Bonnie image" />
                                </div>
                                <div>

                                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {{ event.user.first_name }} {{ event.user.last_name }}
                                    </h5>
                                    <!-- <span class="text-sm text-gray-500 dark:text-gray-400">Visual
                                Designer</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="flex bg-[#FFE047] rounded-md items-center py-4 px-6 space-x-4 "
                        v-if="store.isAuthenticated">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                        </svg>
                        <p class="font-bold text-lg" @click="handleInsetTicket">
                            Buy Tickets
                        </p>
                    </button>
                </div>
            </div>


        </div>

        <div class="space-y-4">

            <h3 class="text-3xl font-bold">Location </h3>

            <p v-if="event.location" class="text-wrap flex items-center gap-x-1">
                <Icon name="ic:outline-location-on" class="text-2xl" />
                <span> {{ event.location.city.name }}, {{ event.location.area.name }}
                </span>
            </p>
            <EventsLocation :event-location="event.location"></EventsLocation>
        </div>










    </div>

</template>
