<script setup>
import tags from '~/components/selectors/tags.vue';
import getEvents from '~/graphql/query/events/list.gql';

const events = ref([]);
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

const { onResult, onError, refetch } = queryList(getEvents, {
        filter: filter
});

onResult((result) => {
        events.value = result.data.events;
        console.log(events.value[0])
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
                        <div class="w-full md:w-1/2 my-8 ">
                                <div class="flex  items-center justify-start flex-wrap ">

                                        <UiTag v-for="tag in tagList" :tag-name="tag.name" />

                                </div>
                        </div>


                        <div class="grid grid-cols-1 gap-y-8 md:grid-cols-3  md:gap-x-4 ">
                                <UiVerticalCard v-for="event in events" :key="event.price" :event="event"
                                        @refetch="refetch" />
                        </div>
                </div>

                <div class="px-8 md:px-24 md:py-16">

                        <h3 class="text-3xl  font-bold my-4 pr-32">Latest Events</h3>

                        <hr class="my-6 border-gray-200 w-3/4 ">

                        <div class="grid grid-cols-1 gap-y-8 md:grid-cols-3  md:gap-x-4 ">
                                <UiVerticalCard v-for="event in events" :key="event.price" :event="event" />
                        </div>
                </div>


        </div>



</template>
