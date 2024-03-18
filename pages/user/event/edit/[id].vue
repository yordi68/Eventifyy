<script setup>

import { useField, useForm } from "vee-validate"
import getEventData from "~/graphql/query/events/item.gql"
import updateEventQuery from "~/graphql/mutations/events/edit.gql"
import insertLocationMutation from "~/graphql/mutations/events/add-event-location.gql"


import { toast } from "vue3-toastify";
const { handleSubmit } = useForm();
const route = useRoute()
/**---------------------------Get Event Info---------------**/
const event = ref(null)
const city = ref(null)
const selectedTags = ref([])
const selectedImages = ref(['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600'])
const area = ref(null);
const lat = ref(0);
const long = ref(0);

const {
    onResult: eventOnResult,
    loading: eventLoading,
    refetch: eventRefetch,
    onError: eventOnError,
} = singleQuery(getEventData, { id: route.params.id })



eventOnResult(({ data }) => {
    event.value = { ...data.events_by_pk }
    selectedTags.value = data.events_by_pk.tags.map(tag => tag?.tag?.id)
    city.value = data.events_by_pk.location.city_id
    area.value = data.events_by_pk.location.area_id
    lat.value = data.events_by_pk.location?.location?.coordinates[0]
    long.value = data.events_by_pk.location?.location?.coordinates[1]
})


/**-------------------Insret location------------------ */

const { mutate: insertLocation, loading: insertLocationLoading, onDone: insertLocationDone, onError: insertLocationError } = anonymousMutation(insertLocationMutation, {
    clientId: "auth"
})
insertLocationDone((response) => {
    const tagObject = selectedTags.value.map(tag => ({ tag_id: tag, event_id: event.value.id }))




    const eventObject = {
        title: event.value.title,
        description: event.value.description,
        price: event.value.price,
        time: event.value.time,
        venue: event.value.venue,
        category_id: event.value.category_id,
        location_id: response.data?.insert_locations?.returning[0]?.id

    }
    editMutate({
        eventObject: eventObject,
        mediaObject: mediaObject,
        tagObject: tagObject,
        id: event.value.id
    })


});

/*----------------------Edit Event---------------------------*/
const { mutate: editMutate, loading: editLoading, onDone: editDone, onError: editError } = anonymousMutation(updateEventQuery, {
    clientId: "auth"
})

editDone((response) => {
    toast.success("Event updated successfully", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,

    });
    eventRefetch()

});

editError((error) => {
    toast.error("Something went wrong while editing. Try again");
});




const onSubmit = handleSubmit(() => {
    const locationObject = {
        city_id: city.value,
        area_id: area.value,
        location: {
            type: "Point",
            coordinates: [parseFloat(lat.value), parseFloat(long.value)]
        },
    }



    insertLocation({
        locationObject: locationObject,
    })
})


definePageMeta({
    layout: 'admin',
    middleware: 'auth',
})
</script>
<template>
    <form v-if="!eventLoading && event" class="grid grid-cols-2 space-x-10 p-10 w-full">
        <div class="flex flex-col items-start justify-start">
            <BaseTextInput v-model="event.title" label="Title" name="title" rules="required" />

            <LazySelectorsCategory v-model="event.category_id"></LazySelectorsCategory>

            <LazySelectorsTags v-model="selectedTags"></LazySelectorsTags>


            <BaseTextInput v-model="event.venue" label="Venue" name="venue" rules="required" />

            <BaseTextInput v-model="event.price" type="number" label="Price" name="price" rules="required" />

            <div class=" w-full bg-white  rounded">
                <h3 class="text-lg mb-4">Description</h3>
                <textarea v-model="event.description"
                    class="w-full h-40 p-2 border border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
                    placeholder="Write your description here..."></textarea>
            </div>


        </div>




        <div class=" space-y-10 flex flex-col">

            <BaseTextInput v-model="event.time" type="datetime-local" label="Time" name="time" rules="required" />


            <LazySelectorsCity v-model="city"></LazySelectorsCity>
            <LazySelectorsArea v-model="area" :city-id="city"></LazySelectorsArea>

            <div class="flex items-center justify-between w-full gap-x-6">
                <BaseTextInput placeholder="9.014253" type="number" v-model="lat" label="Latitude" name="labelatitude"
                    rules="required" />
                <BaseTextInput placeholder="39.014253" type="number" v-model="long" label="Longitude" name="longitude"
                    rules="required" />

            </div>

            <BaseImageUpload v-model="uploadedFiles" />

        </div>

        <div class="col-span-2">
            <button type="submit" @click.prevent="onSubmit"
                class="flex w-full  justify-center  rounded-md bg-[#2D2C3C]  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                Event
            </button>
        </div>


    </form>
</template>