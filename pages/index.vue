<script setup>
import getEvents from '~/graphql/query/events/list.gql';

const popularEvents = ref([]);
const latestEvents = ref([]);


const filter = computed(() => {
        let query = {};
        // query.user = {
        //         id: {
        //                 _eq: user.id
        //         }
        // }

        return query;
});

/*--------------------- Fetching Latest Events ----------------------- */
const { onResult: latestEventResult, onError: latestEventError, refetch: latestEventRefetch, loading: latestEventLoading } = queryList(getEvents, {
        filter: filter,
        order: ref({ "created_at": "desc" }),
        offset: 0,
        limit: ref(6)
});


latestEventResult((result) => {
        latestEvents.value = result.data.events;
        // console.log(latestEvents.value)
        // console.log(latestEvents.value[0])
})

latestEventError((error) => {
        console.log("Error while fetching events in home page", error)
})


// const { onResult: popularEventResult, onError: popularEventError, refetch: popularEventRefetch } = queryList(getEvents, {
//         filter: filter,
//         order: ref({ "created_at": "desc" }),
//         offset: 0,
//         limit: ref(6)
// });



/*--------------------- Fetching Popular Events ----------------------- */
const { onResult: popularEventResult, onError: popularEventError, refetch: popularEventRefetch, loading: popularEventLoading } = queryList(getEvents, {
        filter: filter,
        order: ref({
                "follows_aggregate": {
                        "count": "desc"
                }
        }),
        offset: 0,
        limit: ref(6)
});


// const { onResult: latestEventResult, onError: latestEventError, refetch: latestEventRefetch } = queryList(getEvents, {
//         filter: filter,
//         order: ref({
//                 "follows_aggregate": {
//                         "count": "desc"
//                 }
//         }),
//         offset: 0,
//         limit: ref(6)
// });


popularEventResult((result) => {
        popularEvents.value = result.data.events;
        // console.log(popularEvents.value[0])
})

popularEventError((error) => {
        console.log("Error while fetching events in home page", error)
})








definePageMeta({
        layout: "default"
})
</script>






<template>

        <div>
                <UiHero />
                <!-- <div class="px-8 md:px-24">
                        <h3 class="text-3xl font-bold my-4 pr-32">Popular Events</h3>
                        <div class="grid grid-cols-1 gap-y-8 md:grid-cols-3  md:gap-x-4 ">
                                <UiVerticalCard v-for="popularEvent in popularEvents" :key="popularEvent.price"
                                        :event="popularEvent" @refetch="popularEventRefetch" />
                        </div>
                </div>

                <div class="px-8 md:px-24 md:py-16">
                        <h3 class="text-3xl  font-bold my-4 pr-32">Latest Events</h3>
                        <hr class="my-6 border-gray-200 w-3/4 ">
                        <div class="grid grid-cols-1 gap-y-8 md:grid-cols-3  md:gap-x-4 ">
                                <UiVerticalCard v-for="latestEvent in latestEvents" :key="latestEvent.price"
                                        :event="latestEvent" @refetch="latestEventRefetch" />
                        </div>
                </div> -->
                <div class="px-8 md:px-24 md:py-16">
                        <h3 class="text-3xl  font-bold my-4 pr-32">Popular Events</h3>
                        <hr class="my-6 border-gray-200 w-3/4 ">
                        <div class="pt-4 overflow-y-scroll col-span-12 lg:col-span-10 h-full"
                                v-if="!popularEventLoading">
                                <div v-if="latestEvents && latestEvents.length > 0">
                                        <div
                                                class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                                <UiVerticalCard @refetch="popularEventRefetch"
                                                        v-for="popularEvent in popularEvents" :key="popularEvent.price"
                                                        :event="popularEvent" />
                                        </div>
                                </div>
                                <div v-else class="flex flex-col items-center justify-center my-auto ">

                                        <img src="/noEvents-2.svg" class="max-w-32" />
                                        <span class="text-md font-semibold">Sorry! We couldn't find any events</span>
                                </div>
                        </div>

                        <div class="col-span-10 " v-else>
                                <div
                                        class="overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200">
                                        <div
                                                class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                                <UiLoadingCard v-for="index in 9" :key="index" />
                                        </div>

                                </div>
                        </div>
                </div>

                <div class="px-8 md:px-24">
                        <h3 class="text-3xl  font-bold my-4 pr-32">Latest Events</h3>
                        <hr class="my-6 border-gray-200 w-3/4 ">
                        <div class="pt-4 overflow-y-scroll col-span-12 lg:col-span-10 h-full"
                                v-if="!latestEventLoading">
                                <div v-if="latestEvents && latestEvents.length > 0">
                                        <div
                                                class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                                <UiVerticalCard @refetch="latestEventRefetch" v-for="
                                                latestEvent in latestEvents" :key="latestEvent.price"
                                                        :event="latestEvent" />
                                        </div>
                                </div>
                                <div v-else class="flex flex-col items-center justify-center my-auto ">

                                        <img src="/noEvents-2.svg" class="max-w-32" />
                                        <span class="text-md font-semibold">Sorry! We couldn't find any events</span>
                                </div>
                        </div>



                        <div class="col-span-10 " v-else>
                                <div
                                        class="overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200">
                                        <div
                                                class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                                <UiLoadingCard v-for="index in 9" :key="index" />
                                        </div>

                                </div>
                        </div>

                </div>


        </div>



</template>
