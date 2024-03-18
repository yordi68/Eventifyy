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
const { onResult, onError, refetch } = queryList(
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
        layout: 'admin'
})
</script>
<template>
        <div class="grid grid-cols-3 gap-6">
                <!-- <UiCard has-icon v-for="event in events" :key="event.price" :event="event" /> -->
                <UiVerticalCard v-for="event in events" :key="event.price" :event="event" @refetch="refetch" />
        </div>
</template>
