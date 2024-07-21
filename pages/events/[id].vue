<script setup>
import getEvents from '@/graphql/query/events/list.gql';
import getEvent from "~/graphql/query/events/item.gql";
import addFollows from "~/graphql/mutations/follows/item.gql";
import addBookmarks from "~/graphql/mutations/bookmarks/item.gql";
import buyTicket from "~/graphql/mutations/tickets/add.gql"
import { useAuthStore, useUserStore } from "~/stores/auth";
import { toast } from "vue3-toastify";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import deleteBookmark from "~/graphql/mutations/bookmarks/delete.gql";
import deleteFollow from "~/graphql/mutations/follows/delete.gql";








const store = useAuthStore();
const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const event = ref({});
let isFollowed = ref(false);
let isBookmarked = ref(false);
let isCreator = ref(false);
let hasBoughtTicket = ref(false);
const isOpen = ref(false)
const images = reactive([])

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
const selectedImage = computed(() => images.find(image => image.selected));

const selectImage = (selectedUrl) => {
    images.forEach(image => image.selected = image.url === selectedUrl);
}


/*----------------------------- Fetching a single event by its id -------------------------------- */


const { onResult, onError, refetch } = singleQuery(getEvent, {
    id: route.params.id,
    clientId: "auth",
    include: userStore.isAuthenticated
});

onResult((result) => {
    if (result.data.events_by_pk) {
        event.value = result.data.events_by_pk;
        const eventLocation = event.value.location
    }

    event.value?.event_medias.map((media) => {
        images.push(
            {
                url: media?.media?.url,
                selected: false
            }
        )
        images[0].selected = true
    })

    if (userStore.isAuthenticated) {
        if (event.value.user.id === userStore.id) {
            isCreator.value = true;
        }
    }
    if (userStore.isAuthenticated) {
        event.value?.bookmarks?.forEach(function (bookmark) {
            if (bookmark.user && bookmark.user.id) {

                if (bookmark.user.id === userStore.id) {
                    isBookmarked.value = true;
                }
            }
        })

        event.value?.follows?.forEach(function (follow) {
            if (follow.user && follow.user.id) {
                if (follow.user.id === userStore.id) {
                    isFollowed.value = true;
                }
            }
        })
        event.value?.tickets?.forEach(function (ticket) {
            if (ticket.user && ticket.user.id) {
                if (ticket.user.id === userStore.id) {
                    hasBoughtTicket.value = true;
                }
            }
        })

    }
})



onError((error) => {
    console.log("Error while fetching a single event by its id", error);
})




/*----------------------------- Buying Ticket Mutation  -------------------------------- */

const { mutate: buyTicketMutate, onDone: buyTicketDone, onError: buyTicketError } = anonymousMutation(buyTicket, {
    clientId: "auth"
})





const handleInsetTicket = async () => {
    if (!userStore.isAuthenticated) {
        router.replace("/login");
        return;
    }
    const input = {
        user_id: userStore.id,
        event_id: event.value.id
    }

    console.log("booking an event", input)
    buyTicketMutate({ input })
}


buyTicketDone(() => {
    refetch();
    openModal()
    // toast.success("You followed an event", {
    //     transition: toast.TRANSITIONS.FLIP,
    //     position: toast.POSITION.TOP_RIGHT,
    // });
})


buyTicketError((error) => {
    if (error.message.includes("duplicate")) {
        toast.error("You already bought a ticket for this event", {
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


/*----------------------------- Adding Follow Mutation -------------------------------- */

const { mutate: followMutate, onDone: followDone, onError: followError, loading } = anonymousMutation(addFollows, {
    clientId: "auth"
});

const handleFollow = async () => {
    if (!userStore.isAuthenticated) {
        router.replace("/login");
        return;
    }
    const input = {
        user_id: userStore.id,
        event_id: event.value.id
    }
    followMutate({ input });
}


followDone(() => {
    toast.success("You followed an event", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
    refetch();
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
        position: toast.POSITION.TOP_RIGHT
    })
})

/*----------------------------------- Delete Follow Mutation -------------------------------- */

const { mutate: deleteFollowMutate, onDone: deleteFollowOnDone, onError: deleteFollowOnError } = anonymousMutation(deleteFollow, {
    clientId: "auth"
});

const handleDeleteFollow = () => {
    const input = {
        event_id: event.value.id,
        user_id: userStore.id
    }
    deleteFollowMutate(input)
}

deleteFollowOnDone(() => {
    toast.success("You removed this event from followed", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
    refetch();
    isFollowed.value = false;
})

deleteFollowOnError((error) => {
    toast.error("Something went wrong while deleting from follws", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT
    })
    console.log(error)
})



/*----------------------------- Adding BookMark Mutation -------------------------------- */
const { mutate: bookmarkMutate, onDone: bookmarkDone, onError: bookmarkError } = anonymousMutation(addBookmarks, {
    clientId: "auth"
});

const handleBookmark = async () => {
    if (!userStore.isAuthenticated) {
        router.replace("/login");
        return;
    }
    const input = {
        user_id: userStore.id,
        event_id: event.value.id
    }
    console.log("object")
    bookmarkMutate({ input });

}

bookmarkDone(() => {
    toast.success("You bookmarked an event", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
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


const handleDeleteBookmark = async () => {
    const input = {
        event_id: event.value.id,
        user_id: userStore.id
    }
    console.log("this is while trying to unbookmark", input)
    deleteBookmarkMutate(input)
}

deleteBookmarkOnDone(() => {
    toast.success("You removed this event from bookmarks", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
    refetch();
    isBookmarked.value = false;
})

deleteBookmakeOnError((error) => {
    console.log("error", error)

    toast.error("Something went wrong while deleting from bookmark", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT
    })
})


/*---------------------Fetch Related Event ---------------*/

const filter = computed(() => {
    let query = {}
    query._and = [{
        category_id: {
            _eq: event.value.category_id
        }
    },
    {
        id: {
            _neq: event.value.id
        }
    }
    ]
    return query;
})



let relatedEvents = ref([])

const { onResult: relatedEventResult, onError: relatedEventError, refetch: relatedEventRefetch, loading: relatedEventLoading } = queryList(
    getEvents,
    {
        filter: filter,
        clientId: "auth",
        limit: ref(3)
    }
);



relatedEventResult((result) => {
    relatedEvents.value = result.data.events
})

relatedEventError((error) => {
    toast.error("Something went wrong while fetching related events", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,

    });
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
                <div class="flex items-center justify-center min-h-full p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-yellow-300 shadow-xl rounded-2xl">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                You have bought a ticket
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-black">
                                    We're thrilled that you've purchased our ticket! We can't wait to see you at the
                                    event and share the excitement together
                                </p>
                            </div>

                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-[#2D2C3C] px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
    <div class="px-8 pt-12 mt-8 mb-6 space-y-12 md:pt-8 md:mt-20 dark:bg-gray-800 dark:text-white" v-if="event">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 ">
            <div class="w-full ">
                <img :src="selectedImage?.url" alt="Selected_Event_Image"
                    class="w-full rounded-lg shadow-lg max-h-[420px] object-cover " />

                <div class="grid grid-cols-3 place-content-center lg:place-content-start gap-x-4">
                    <div class="py-4" v-for="image in images">
                        <img :src="image?.url" alt="image_of_an_event" :key="image?.url"
                            @click="selectImage(image?.url)" class="hover:cursor-pointer">
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-y-6">
                <div class="flex flex-col justify-between gap-y-4 lg:flex-row">
                    <h3 class="text-4xl font-bold">{{ event.title }}</h3>
                    <div class="flex items-center gap-x-2">
                        <span>
                            <button @click.stop="handleDeleteBookmark()" v-if="isBookmarked">
                                <Icon name="mdi:bookmark" class="text-2xl text-[#ffe04a]" />
                            </button>
                            <button @click.stop="handleBookmark()" v-else>
                                <Icon name="iconoir:bookmark" class="text-2xl" />
                            </button>
                        </span>


                        <span v-if="!isCreator">
                            <button @click.stop="handleDeleteFollow()" v-if="isFollowed">
                                <icon name="zondicons:minus-outline" class="text-2xl text-[#ffe04a]" />
                            </button>
                            <button @click.stop=" handleFollow()" v-else>
                                <icon name="ri:add-line" class="text-3xl " />
                            </button>
                        </span>

                        <p
                            class="w-max bg-[#FFE047] flex items-center justify-center text-white px-3  rounded-md dark:text-black ">
                            <!-- {{ event.followers_count?.aggregate?.count }} followers -->
                            {{ event.total_follow }} followers

                        </p>
                    </div>

                </div>
                <div class="flex flex-col gap-y-8 md:gap-y-0 md:flex-row gap-x-12">
                    <div class="space-y-2">
                        <h3 class="text-xl font-semibold">Date and Time</h3>
                        <div class="flex gap-x-6">
                            <div class="flex space-x-2">
                                <Icon name="heroicons:calendar-days" class="w-6 h-6" />

                                <p>{{ new Date(event.time).toDateString() }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <Icon name="heroicons:clock" class="w-6 h-6" />

                                <p>{{ new Date(event.time).toLocaleTimeString() }}</p>

                            </div>

                        </div>
                    </div>
                    <div class="space-y-1">
                        <h3 class="text-xl font-semibold">Ticket Information</h3>
                        <div class="flex space-x-2">

                            <Icon name="heroicons:ticket" class="w-6 h-6 dark:text-gray-800" />

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
                    </p>
                </div>
                <div class="space-y-1">
                    <h3 class="text-xl font-semibold">Tags</h3>
                    <div class="flex flex-wrap items-center justify-start gap-x-4">
                        <UiTag v-for="tag in event.tags" :key="tag.id" :tagName="tag.tag.name" />

                    </div>

                </div>
                <div class="flex flex-col items-start justify-between gap-y-4 md:gap-y-0 md:items-center md:flex-row">
                    <div class="space-y-2">
                        <h3 class="text-xl font-semibold">Hosted by</h3>
                        <div v-if="event.user">
                            <div class="flex items-center gap-x-4 justify-evenly">
                                <div>
                                    <img class="object-cover w-16 h-16 mb-3 rounded-full shadow-lg"
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
                        v-if="!isCreator && !hasBoughtTicket">
                        <Icon name="heroicons:ticket" class="w-6 h-6 dark:text-gray-800" />
                        <p class="text-lg font-bold dark:text-gray-800" @click="handleInsetTicket">
                            Buy Tickets
                        </p>
                    </button>
                    <div class="flex bg-[#FFE047] rounded-md items-center py-4 px-6 space-x-4 "
                        v-if="userStore.isAuthenticated && !isCreator && hasBoughtTicket">
                        <Icon name="lets-icons:done-ring-round-fill" class="text-3xl" />
                        <p class="text-lg font-bold text-wrap dark:text-gray-800">
                            <!-- You already bought ticket for this event -->
                            Ticket Booked
                        </p>
                    </div>
                </div>
            </div>


        </div>

        <div class="space-y-4">

            <h3 class="text-3xl font-bold">Location </h3>

            <p v-if="event.location" class="flex items-center text-wrap gap-x-1">
                <Icon name="ic:outline-location-on" class="text-2xl" />
                <span> {{ event.location.city.name }}, {{ event.location.area.name }}
                </span>
            </p>
            <EventsLocation :event-location="event.location"></EventsLocation>
        </div>

        <div class="md:py-16 xl:max-w-[1600px] mx-auto" v-if="relatedEvents && relatedEvents.length > 0">
            <h3 class="pr-32 my-4 text-3xl font-bold">Related Events</h3>
            <hr class="w-3/4 my-6 border-gray-200 ">
            <div class="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:grid-cols-3 md:gap-x-4 ">
                <UiVerticalCard v-for="relatedEvent in relatedEvents" :key="relatedEvent.price" :event="relatedEvent" />
            </div>
        </div>










    </div>

</template>
