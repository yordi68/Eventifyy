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
const area = ref(null)

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
})


/**-------------------Insret location------------------ */

const { mutate: insertLocation, loading: insertLocationLoading, onDone: insertLocationDone, onError: insertLocationError } = anonymousMutation(insertLocationMutation)
insertLocationDone((response) => {
    const tagObject = selectedTags.value.map(tag => ({ tag_id: tag, event_id: event.value.id }))
    // const mediaObject = selectedImages.value(image => ({
    //     media_id: image,
    //     event_id: event.value.id
    // }))
    const mediaObject = {
        data: selectedImages.value.map(url => ({ media: { url }, event_id: event.value.id }))
    }

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
        mediaObject: mediaObject,
        id: event.value.id
    })


});

/*----------------------Edit Event---------------------------*/
const { mutate: editMutate, loading: editLoading, onDone: editDone, onError: editError } = anonymousMutation(updateEventQuery)

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
        x_coordinate: "1238732598",
        y_coordinate: "1238732598"
    }

    insertLocation({
        locationObject: locationObject,
    })
})


definePageMeta({
    layout: 'admin'
})
</script>
<template>
    <form v-if="!eventLoading && event" class="flex space-x-10 p-10 w-full">
        <div class=" w-1/2 flex flex-col items-start justify-start">
            <BaseTextInput v-model="event.title" label="Title" name="title" rules="required" />

            <LazySelectorsCategory v-model="event.category_id"></LazySelectorsCategory>

            <LazySelectorsTags v-model="selectedTags"></LazySelectorsTags>


            <BaseTextInput v-model="event.venue" label="Venue" name="venue" rules="required" />


            <div class=" w-full bg-white  rounded">
                <h3 class="text-lg mb-4">Description</h3>
                <textarea v-model="event.description"
                    class="w-full h-40 p-2 border border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
                    placeholder="Write your description here..."></textarea>
            </div>


        </div>




        <div class=" space-y-10   w-1/2 flex flex-col">

            <BaseTextInput v-model="event.price" type="number" label="Price" name="price" rules="required" />
            <BaseTextInput v-model="event.time" type="datetime-local" label="Time" name="time" rules="required" />


            <LazySelectorsCity v-model="city"></LazySelectorsCity>
            <LazySelectorsArea v-model="area" :city-id="city"></LazySelectorsArea>




            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Image
                </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-700" stroke="currentColor" fill="none"
                            viewBox="0 0 48 48" aria-hidden="true">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file-upload"
                                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span class="text-gray-700">Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only">
                            </label>
                            <p class="pl-1 text-gray-700">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-700">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <button type="submit" @click.prevent="onSubmit"
                    class="flex w-full  justify-center  rounded-md bg-[#20c05c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1a9e4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit
                    Event
                </button>
            </div>



        </div>

    </form>
</template>