<script setup>
import getEvents from '@/graphql/query/events/list.gql';

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
                        _eq: "44bd8495-7834-4ac5-aef2-69d6de8e1046"
                }
        }

        return query;

});


console.log(filter.value)


const { onResult, onError, refetch } = queryList(
        getEvents,
        { filter: filter },
);

onResult((result) => {
        events.value = result.data.events;
        console.log(events.value[0])
})

definePageMeta({
        layout: 'admin'
})
</script>
<template>
        <div class="grid grid-cols-3 gap-6">
                <UiCard has-icon v-for="event in events" :key="event.price" :event="event" />

        </div>
</template>
