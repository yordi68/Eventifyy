<script setup>
import getEvents from '@/graphql/query/events/list.gql';

const events = ref([]);
const limit = ref(10);
const offset = ref(1);
const search = ref("");
const order = ref(null);
const filter = ref(null);

const { onResult, onError, refetch } = queryList(
        filter,
        order,
        limit,
        offset,
        getEvents
);

// provide("refetch", refetch)

onResult((result) => {
        events.value = result?.data?.events;
})

console.log(events);
onError((error) => {
        console.log(error)
});










definePageMeta({
        layout: 'public'
})
</script>




















<template>
        <div>
                <UiSearchHero />
                <div class="grid grid-cols-12 h-screen overflow-hidden">
                        <Filter class="hidden md:block md:col-span-2 h-full overflow-y-scroll " />
                        <div class="overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 space-y-8 mx-auto   py-6 sm:px-6 lg:px-8">
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                        <UiCard />
                                </div>
                        </div>
                </div>
        </div>
</template>
