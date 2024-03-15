<script setup>
import addFollows from "~/graphql/mutations/follows/item.gql";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

const isFollowed = false;



const store = useAuthStore();


const { mutate: followMutate, onDone: followDone, onError: followError, loading } = anonymousMutation(addFollows, {
        clientId: "auth"
});

const handleFollow = async () => {
        const input = {
                user_id: store.id,
                // event_id: store
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



const props = defineProps({
        event: {
                thumbnail: String,
                title: String,
                date: String,
                place: String,
                price: Number,
        },
})


</script>











<template>
        <div
                class="w-full md:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">


                <img class="rounded-t-lg object-fit" src="/event-details-1.jpg" alt="" />

                <div class="p-5 flex flex-col space-y-2">

                        <h5 class="text-wrap text-bold  text-md md:text-xl">
                                {{ event.title }}
                        </h5>

                        <div class="flex space-x-3 text-sm  md:text-md">
                                <p>{{ event.date }}</p>
                                <div class="h-full bg-black w-px"></div>
                                <p>{{ event.place }}</p>
                        </div>
                        <p>{{ event.date }}</p>
                        <span class="flex items-center  space-x-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em" viewBox="0 0 36 36">
                                        <path fill="#038212"
                                                d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M4 26v-4.85A5.18 5.18 0 0 1 8.79 26Zm0-11.15V10h4.79A5.18 5.18 0 0 1 4 14.85m14 10.3c-3.47 0-6.3-3.21-6.3-7.15s2.83-7.15 6.3-7.15s6.3 3.21 6.3 7.15s-2.83 7.15-6.3 7.15M32 26h-4.75A5.18 5.18 0 0 1 32 21.15Zm0-11.15A5.18 5.18 0 0 1 27.25 10H32Z"
                                                class="clr-i-solid clr-i-solid-path-1" />
                                        <ellipse cx="18" cy="18" fill="#038212" class="clr-i-solid clr-i-solid-path-2"
                                                rx="4" ry="4.72" />
                                        <path fill="none" d="M0 0h36v36H0z" />
                                </svg>

                                {{ event.price }}

                        </span>
                        <div>
                                <div v-if="isFollowed">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                </div>
                                <div v-else>

                                </div>
                        </div>
                </div>
        </div>
</template>
