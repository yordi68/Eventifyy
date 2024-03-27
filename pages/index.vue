<script setup>
import getEvents from '~/graphql/query/events/list.gql';
import getCategories from '~/graphql/query/categories/list.gql';


const categoryFilter = ref(null);

// const filter = computed(() => {
//         // let query = {};

//         return {
//                 category: {
//                         id: {
//                                 _eq: category.id
//                         }
//                 }
//         };
// });

/*--------------------- Fetching Latest Events ----------------------- */

const latestEvents = ref([]);

const { onResult: latestEventResult, onError: latestEventError, refetch: latestEventRefetch, loading: latestEventLoading } = queryList(getEvents, {
        filter: categoryFilter,
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





/*--------------------- Fetching Popular Events ----------------------- */

const popularEvents = ref([]);


const { onResult: popularEventResult, onError: popularEventError, refetch: popularEventRefetch, loading: popularEventLoading } = queryList(getEvents, {
        filter: categoryFilter,
        order: ref({
                "follows_aggregate": {
                        "count": "desc"
                }
        }),
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





/*--------------------- Fetching Categories ----------------------- */
let categories = ref([]);

const {
        onResult: categoryResult,
        onError: categoryError,
        loading: categoryLoading,
        refetch: categoryRefetch
} = queryList(getCategories,
        {
                clientId: "auth",
                limit: ref(5)

        });


categoryResult((result) => {
        categories.value = result.data.categories;
        // console.log(categories.value)
})

categoryError((error) => {
        console.log("Error while fetching categories in home page", error)
})




definePageMeta({
        layout: "default"
})
</script>






<template>

        <div>
                <UiHero />

                <div class="px-28 md:px-24 flex items-start justify-start gap-x-4 mt-10"
                        v-if="categories && categories.length > 0">
                        <div v-for="category in categories" :key="category.id">
                                <button type="button"
                                        class="text-black border border-white bg-gray-200 whitespace-nowrap hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-sm py-1 text-center dark:text-white dark:focus:ring-gray-800 px-2"
                                        @click="categoryFilter = { category: { id: { _eq: category.id } } }">
                                        {{ category.name }}
                                </button>
                        </div>
                        <!-- this is not reactive .... change it -->
                        <button type="button" :disabled="categoryFilter == null"
                                class="text-black border border-white bg-gray-200 whitespace-nowrap hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 x focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-sm py-1 text-center dark:text-white dark:focus:ring-gray-800 px-2  disabled:opacity-60 disabled:cursor-not-allowed"
                                @click="categoryFilter = null">
                                Clear Filter
                        </button>
                </div>

                <div class="px-8 md:px-24 md:py-4">
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
