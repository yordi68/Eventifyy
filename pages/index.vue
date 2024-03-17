<script setup>
import getEvents from '~/graphql/query/events/list.gql';

const popularEvents = ref([]);
const latestEvents = ref([]);
const tagList = [
        {
                name: 'All'
        },
        {
                name: 'Today'
        },
        {
                name: 'Tommorrow'
        },
        {
                name: 'This Weekend'
        },
]

const filter = computed(() => {
        let query = {};
        // query.user = {
        //         id: {
        //                 _eq: user.id
        //         }
        // }

        return query;

});

/*--------------------- Fetching Popular Events ----------------------- */
const { onResult: popularEventResult, onError: popularEventError, refetch: popularEventRefetch } = queryList(getEvents, {
        filter: filter,
        order: ref({ "created_at": "desc" }),
        offset: 0,
        limit: ref(6)
});

popularEventResult((result) => {
        popularEvents.value = result.data.events;
        // console.log(popularEvents.value[0])
})

popularEventError((error) => {
        console.log("Error while fetching events in home page", error)
})

/*--------------------- Fetching Latest Events ----------------------- */
const { onResult: latestEventResult, onError: latestEventError, refetch: latestEventRefetch } = queryList(getEvents, {
        filter: filter,
        order: ref({
                "follows_aggregate": {
                        "count": "desc"
                }
        }),
        offset: 0,
        limit: ref(6)
});

latestEventResult((result) => {
        latestEvents.value = result.data.events;
        console.log(latestEvents.value)
        console.log(latestEvents.value[0])
})

latestEventError((error) => {
        console.log("Error while fetching events in home page", error)
})



definePageMeta({
        layout: "default"
})
</script>






<template>

        <div>
                <UiHero />
                <div class="px-8 md:px-24">
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
                </div>


        </div>



</template>
