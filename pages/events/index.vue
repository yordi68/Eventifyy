<script setup>
import getEvents from '@/graphql/query/events/list.gql';


function getUTCTimestamps() {
        const now = new Date();

        const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1) - 1);

        const startOfTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
        const endOfTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 2) - 1);

        const startOfWeek = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay()));
        const endOfWeek = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay() + 7) - 1);

        const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));

        const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
        const endOfYear = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 0, 23, 59, 59, 999));

        // Format dates in ISO 8601 with time zone offset
        const formatDate = date => date.toISOString().split('.')[0] + '+00:00';

        return {
                today: { start: formatDate(startOfDay), end: formatDate(endOfDay) },
                tomorrow: { start: formatDate(startOfTomorrow), end: formatDate(endOfTomorrow) },
                week: { start: formatDate(startOfWeek), end: formatDate(endOfWeek) },
                month: { start: formatDate(startOfMonth), end: formatDate(endOfMonth) },
                year: { start: formatDate(startOfYear), end: formatDate(endOfYear) }
        };
}

const events = ref([]);
const limit = ref(10);
const offset = ref(1);
const search = computed(() => {
        return useRoute().query.search || ''
})
const order = ref(null);

const priceFilter = computed(() => {
        const priceQuery = useRoute().query.price
        let arr = []
        if (priceQuery) {
                if (typeof (priceQuery) == 'string') {
                        arr.push(priceQuery)
                }
                else {
                        arr = priceQuery
                }
        }
        return {
                _or: arr.map(price => {
                        if (price === 'free') {
                                return {
                                        price: {
                                                _eq: 0
                                        }
                                }
                        }
                        if (price == 'paid') {
                                return {
                                        price: {
                                                _gt: 0
                                        }
                                }
                        }
                })
        }
})

const locationFilter = computed(() => {
        const locationQuery = useRoute().query.location
        let arr = []
        if (locationQuery) {
                if (typeof (locationQuery) == 'string') {
                        arr.push(locationQuery)
                }
                else {
                        arr = locationQuery
                }
        }
        return {
                _or: arr.map(location => ({
                        location: {
                                city: {
                                        name: {
                                                _eq: location
                                        }
                                }
                        }
                }))
        }
})

const categoryFilter = computed(() => {
        const categoryQuery = useRoute().query.category
        let arr = []
        if (categoryQuery) {
                if (typeof (categoryQuery) == 'string') {
                        arr.push(categoryQuery)
                }
                else {
                        arr = categoryQuery
                }
        }
        return {
                _or: arr.map(category => ({
                        category: {

                                name: {
                                        _eq: category
                                }

                        }
                }))
        }
})

const dates = ref({})

const dateFilter = computed(() => {
        const _or = []
        const timestamps = getUTCTimestamps()
        for (const key in dates.value) {

                if (dates.value[key]?.isChecked) {
                        _or.push({
                                _and: [{
                                        time: {
                                                _gte: timestamps[key].start
                                        }
                                }, {
                                        time: {
                                                _lte: timestamps[key].end
                                        }
                                }]
                        })

                }
        }
        return {
                _or
        }
})

const filter = computed(() => {
        const _and = [
                {
                        _or: [
                                {
                                        title: {
                                                _ilike: `%${search.value}%`
                                        }
                                },
                                {
                                        user: {
                                                first_name: {
                                                        _ilike: `%${search.value}%`
                                                }
                                        }
                                },
                                {
                                        user: {
                                                last_name: {
                                                        _ilike: `%${search.value}%`
                                                }
                                        }
                                },
                                {
                                        tags: {
                                                tag: {
                                                        name: {
                                                                _ilike: `%${search.value}%`
                                                        }
                                                }
                                        }
                                }
                        ]
                }
        ]

        if (priceFilter.value && priceFilter.value._or.length > 0) {
                _and.push({ ...priceFilter.value })
        }

        if (locationFilter.value && locationFilter.value._or.length > 0) {
                _and.push({ ...locationFilter.value })
        }

        if (categoryFilter.value && categoryFilter.value._or.length > 0) {
                _and.push({ ...categoryFilter.value })
        }

        if (dateFilter.value && dateFilter.value._or.length > 0) {
                _and.push({ ...dateFilter.value })
        }

        let query = {
                _and
        };
        return query;

});



const { onResult, onError, refetch, loading } = queryList(
        getEvents,
        {
                filter: filter,
                clientId: ref("auth")
        }
);



onResult((result) => {
        events.value = result.data.events;
        // console.log(events.value[0])
})

// console.log(events);

onError((error) => {
        console.log(error)
});


definePageMeta({
        layout: 'default'
})

</script>

<template>
        <div>
                <UiSearchHero />
                <div class="grid grid-cols-12 h-screen overflow-hidden">
                        <Filter v-model="dates" class="hidden md:block md:col-span-2 h-full overflow-y-scroll " />
                        <div class="pt-4 overflow-y-scroll col-span-12 lg:col-span-10 h-full  border-l-2 border-gray-200"
                                v-if="!loading">
                                <div v-if="events && events.length > 0">
                                        <div
                                                class="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto py-6 sm:px-6 lg:px-8">
                                                <UiVerticalCard @refetch="refetch" v-for="event in events"
                                                        :key="event.price" :event="event" />
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
