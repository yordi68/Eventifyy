<script setup>
import getEvents from '@/graphql/query/events/list.gql';

const events = ref([]);
const limit = ref(10);
const offset = ref(1);
const search = ref("");
const order = ref(null);
const filter = ref(null);

const { onResult, onError, refetch } = queryList(
        getEvents,
        {
                filter,
                order,
                limit,
                offset,

        }
);

// provide("refetch", refetch)

onResult((result) => {
        events.value = result.data.events;
        console.log(events.value[0])
})

console.log(events);
onError((error) => {
        console.log(error)
});



// const events = [
//         {
//                 thumbnail: '/event-details-1.jpg',
//                 title: 'Noteworthy technology',
//                 date: 'Nov 23 - 29',
//                 place: 'Chengapattu, India',
//                 price: 1200,
//         },
//         {
//                 thumbnail: '/event-details-1.jpg',
//                 title: 'Noteworthy technology',
//                 date: 'Nov 23 - 29',
//                 place: 'Chengapattu, India',
//                 price: 1200,
//         },
//         {
//                 thumbnail: '/event-details-1.jpg',
//                 title: 'Noteworthy technology',
//                 date: 'Nov 23 - 29',
//                 place: 'Chengapattu, India',
//                 price: 1200,
//         },
//         {
//                 thumbnail: '/event-details-1.jpg',
//                 title: 'Noteworthy technology',
//                 date: 'Nov 23 - 29',
//                 place: 'Chengapattu, India',
//                 price: 1200,
//         },
//         {
//                 thumbnail: '/event-details-1.jpg',
//                 title: 'Noteworthy technology',
//                 date: 'Nov 23 - 29',
//                 place: 'Chengapattu, India',
//                 price: 1200,
//         },
//         {
//                 thumbnail: '/event-details-1.jpg',
//                 title: 'Noteworthy technology',
//                 date: 'Nov 23 - 29',
//                 place: 'Chengapattu, India',
//                 price: 1200,
//         },
// ]

definePageMeta({
        layout: 'default'
})
</script>

<template>
        <div>
                <UiSearchHero />
                <div class="grid grid-cols-12 h-screen overflow-hidden">
                        <Filter class="hidden md:block md:col-span-2 h-full overflow-y-scroll " />
                        <div class="overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 space-y-8 mx-auto py-6 sm:px-6 lg:px-8">
                                        <UiCard v-for="event in events" :key="event.price" :event="event" />
                                </div>
                        </div>
                </div>
        </div>
</template>
