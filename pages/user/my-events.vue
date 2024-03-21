<script setup>
import getEvents from '@/graphql/query/events/list.gql';
import { useAuthStore } from "~/stores/auth";
const { user } = useAuthStore();
const router = useRouter()

const events = ref([]);
const limit = ref(10);
const offset = ref(1);
const search = ref("");
const order = ref(null);

const filter = computed(() => {
        let query = {};
        query.user = {
                id: {
                        _eq: user.id
                }
        }

        return query;

});


// console.log(filter.value)

/*------------------------- Query the users event ---------------------- */
const { onResult, onError, refetch, loading } = queryList(
        getEvents, {
        filter: filter,
        clientId: ref('auth')
}
);

onResult((result) => {
        events.value = result.data.events;
        console.log(events.value[0])
})

onError((error) => {
        console.log(error)
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
                                <UiVerticalCard @refetch="refetch" v-for="event in events" :key="event.price"
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
