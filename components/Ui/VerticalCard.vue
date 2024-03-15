<script setup>
import addFollows from "~/graphql/mutations/follows/item.gql";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

let isOwner = false;
const isFollowed = true;
const store = useAuthStore();
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


const { mutate: followMutate, onDone: followDone, onError: followError, loading } = anonymousMutation(addFollows, {
        clientId: "auth"
});

const handleFollow = async () => {
        const input = {
                user_id: store.user.id,
                event_id: props.event.id
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

if (store.user.id === props.event.user.id) {
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


console.log(props.event)


</script>











<template>
        <div
                class="w-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img class=" w-full h-1/2 rounded-t-lg object-fit" :src="event.thumbnail" alt="" />
                <div class="p-5 flex flex-col space-y-2">

                        <h5 class="text-wrap text-bold  text-md md:text-xl">
                                {{ event.title }}
                        </h5>

                        <div class="flex space-x-3 text-sm  md:text-md">
                                <p>{{ formattedDateTime.formattedDate }}</p>
                                <p>{{ formattedDateTime.formattedTime }}</p>
                                <div class="h-full bg-black w-px"></div>
                                <p>{{ event.place }}</p>
                        </div>
                        <p>{{ event.date }}</p>
                        <span class="flex flex-col items-start  space-x-4 ">
                                <div class="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#008000"
                                                class="w-6 h-6">
                                                <path
                                                        d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                                <path fill-rule="evenodd"
                                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                                                        clip-rule="evenodd" />
                                        </svg>

                                        {{ event.price }}
                                </div>
                                {{ event.user.first_name }}
                                {{ event.user.last_name }}

                        </span>


                        <div class="flex items-start justify-start space-x-8" v-if="isOwner">
                                <div @click="$router.push(`/user/event/edit/${event.id}`)"
                                        class="text-xl cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                </div>
                        </div>

                </div>
        </div>
</template>
