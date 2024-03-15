<script setup>
import getEvent from "~/graphql/query/events/item.gql";
import addFollows from "~/graphql/mutations/follows/item.gql";

import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";


const store = useAuthStore();
const route = useRoute();

const event = ref({});

const { onResult, onError, refetch } = singleQuery(getEvent, {
    id: route.params.id,
});

onResult((result) => {
    event.value = { ...result.data.events_by_pk };
    console.log("Hi this is me", event.value);
})

onError((error) => {
    console.log(error, "error");
})



const { mutate: followMutate, onDone: followDone, onError: followError, loading } = anonymousMutation(addFollows, {
    clientId: "auth"
});

const handleFollow = async () => {
    const input = {
        user_id: store.user.id,
        event_id: event.value.id
    }
    followMutate({ input });
}

followDone(() => {
    toast.success("You followed an event", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
    });
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


// const isFollowing = ref(
//     event.likes.some((like) => like.user_id === store.id)
// );








const eventLocation = ref(
    {
        "id": 12,
        "location": {
            "type": "Point",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::4326"
                }
            },
            "coordinates": [
                9.014253,
                38.818221
            ]
        },
        "area": {
            "name": "Megenagna",
            "__typename": "BasicsAreas"
        },
        "city": {
            "name": "Addis Ababa",
            "__typename": "BasicsCities"
        },
    },

)



</script>










<template>
    <div class="px-32">
        <div class="w-full mt-5">
            <img :src="event.thumbnail" alt="random image" class="w-full h-full object-cover " />
        </div>
        <div class="flex justify-between my-6">
            <h3 class="font-bold text-4xl">{{ event.title }}</h3>
            <div class="flex space-x-4">
                <Icon name="gala:add" size="32" v-if="!isFollowing" class="hover:text-[#FFE047] hover:cursor-pointer" />
                <Icon name="zondicons:minus-outline" size="30" v-else="isFollowing"
                    class="hover:text-[#FFE047] hover:cursor-pointer" />
                <div
                    class="focus:outline-none text-black text-bold bg-[#FFE047] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                    Following
                </div>
                <Icon name="ic:baseline-share" size="32" />
            </div>
        </div>

        <div class="flex justify-between">
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Date and Time</h3>
                <div class="flex space-x-2">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    <p>{{ new Date(event.time).toDateString() }}</p>
                </div>
                <div class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p>{{ new Date(event.time).toLocaleTimeString() }}</p>

                </div>

            </div>
            <div class="space-y-6">
                <button class="flex bg-[#FFE047] rounded-md items-center py-4 px-6 space-x-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                    <p class="font-bold text-lg">
                        Buy Tickets
                    </p>
                </button>
                <div class="space-y-4">
                    <h3 class="font-bold text-lg">Ticket Information</h3>
                    <div class="flex space-x-2">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                        </svg>
                        <p class="text-sm">
                            Standard Ticket: {{ event.price }} each
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="w-full flex justify-between">

            <div class="w-1/3 ">
                <h3 class="text-3xl font-bold">Location</h3>
                <div class="flex items-center justify-start space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-24 h-24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    <p class="text-wrap">
                        Bal Gandharva Rang Mandir, Near Junction Of 24th & 32nd Road &
                        Patwardhan
                        Park,Off Linking Road, Bandra West., Mumbai, India
                    </p>

                </div>
                <div>
                    <EventsLocation :event-location="eventLocation"></EventsLocation>
                </div>
            </div>

            <div class="w-1/3 my-8  flex flex-col items-end">
                <h3 class="text-3xl font-bold my-4 pr-32">Hosted by</h3>
                <div class="w-2/3">
                    <div class="flex items-center justify-evenly">
                        <div>
                            <img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src="https://source.unsplash.com/100x100/?portrait" alt="Bonnie image" />
                        </div>
                        <div>

                            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                <!-- {{ event.user.first_name }} {{ event.user.last_name }} -->
                            </h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400">Visual
                                Designer</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <!-- <div class="w-1/3 my-8">
                        <h3 class="text-3xl font-bold my-4">Hosted by</h3>
                        <div class="w-2/3">
                                <div class="flex items-center justify-evenly">
                                        <div>
                                                <img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                                        src="https://source.unsplash.com/100x100/?portrait"
                                                        alt="Bonnie image" />
                                        </div>
                                        <div>

                                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                        Bonnie Green
                                                </h5>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Visual
                                                        Designer</span>
                                        </div>
                                </div>
                        </div>
                </div> -->


        <div class="w-full my-8">
            <h3 class="text-3xl font-bold my-4">Event Description</h3>
            <p>
                {{ event.description }}
            </p>
        </div>








        <div class="w-1/2 my-8 ">
            <h3 class="text-3xl font-bold my-4">Tags</h3>
            <div class="flex items-center justify-start flex-wrap">
                <UiTag v-for="tag in event.tags" :key="tag.id" :tagName="tag.tag.name" />
            </div>

        </div>
    </div>

</template>
