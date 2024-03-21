<script setup>

import { useField, useForm } from "vee-validate"
import getEventData from "~/graphql/query/events/item.gql"
import updateEventQuery from "~/graphql/mutations/events/edit.gql"
import insertLocationMutation from "~/graphql/mutations/events/add-event-location.gql"


import { toast } from "vue3-toastify";
const { handleSubmit } = useForm();
const route = useRoute()
const router = useRouter()
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
    console.log("event editing", event.value)
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
        tagObject: tagObject,
        id: event.value.id
    })




});

/*----------------------Edit Event---------------------------*/
const { mutate: editMutate, loading: editLoading, onDone: editDone, onError: editError } = anonymousMutation(updateEventQuery, {
    clientId: "auth"
})

editDone(({ data }) => {
    toast.success("Event updated successfully", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,

    });
    eventRefetch()
    console.log("Hi", data)
    router.push(`/events/${data.update_events_by_pk.id}`)

});

editError((error) => {
    toast.error("Something went wrong while editing. Try again");
    console.log("error", error)
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
            <button type="submit" @click.prevent="onSubmit" v-if="!insertLocationLoading"
                class="flex w-full  justify-center  rounded-md bg-[#2D2C3C]  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Edit Event
            </button>
            <div>
                <button type="submit" v-if="insertLocationLoading"
                    class="flex w-full  justify-center items-center  rounded-md bg-[#2D2C3C] hover:bg-[#2D2C3C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>

            </div>
        </div>


    </form>
</template>