<script setup>
import getEvents from '@/graphql/query/events/list.gql';
import { getUser as user } from "~/stores/auth";



const events = ref([]);

/*------------------------- Filtering Events the user follows  ---------------------- */

const filter = computed(() => {
        let query = {};
        query.follows = {
                user_id: {
                        _eq: user.id
                }
        }

        return query;

});


/*------------------------- Fetching Event the user follows ---------------------- */
const { onResult, onError, refetch, loading } = queryList(
        getEvents, {
        filter: filter,
        clientId: ref('auth')
}
);

onResult((result) => {
        events.value = result.data.events;
})

onError((error) => {
        toast.error("Something went wrong while fetching", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,

        });
})



definePageMeta({
        layout: 'admin',
        middleware: 'auth',
})            
</script>







<template>
        <div class="pt-4 overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200"
                v-if="!loading">
                <div v-if="events && events.length > 0">
                        <div class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                <UiVerticalCard @refetch="refetch" v-for="event in events" :key="event.id"
                                        :event="event" />
                        </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center my-auto ">

                        <img src="/noEvents-2.svg" class="max-w-32" />
                        <span class="text-md font-semibold">Sorry! We couldn't find any events</span>
                </div>
        </div>

        <div class="col-span-10 " v-else>
                <div class="overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                <UiLoadingCard v-for="index in 9" :key="index" />
                        </div>

                </div>
        </div>
</template>
