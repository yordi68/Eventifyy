<script setup>

import { useField, useForm } from "vee-validate"
import addData from "~/graphql/mutations/events/add.gql"
import { toast } from "vue3-toastify";
const { handleSubmit } = useForm();


/**-------------------------Add event-------------------- */

const description = ref('');
const title = ref('');
const price = ref(0)
const city = ref(null)
const area = ref(null)
const category = ref(null)
const tags = ref([])
const time = ref('')
const venue = ref('')
const thumbnail = ref('https://icon2.cleanpng.com/20240106/sxp/transparent-web-404-error-webpage-error-computer-screen-error-screenshot-of-a-404-error-webpage-with-icons65997670c34f92.8814632817045561448.jpg')



const {
	mutate: addDataToDB,
	onDone: addDataToDBDone,
	onError: addDataToDBError,
} = anonymousMutation(addData)

addDataToDBDone((response) => {
	toast.success("Event successfully added", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,

	});

});

addDataToDBError((error) => {
	toast.error("Something went wrong");
	console.log(error.message);;
});


const onSubmit = handleSubmit(() => {

	let input = {
		title: title.value,
		description: description.value,
		price: price.value,
		time: time.value,
		venue: venue.value,
		thumbnail: thumbnail.value,
		location: {
			data: {
				city_id: city.value,
				area_id: area.value,
				x_coordinate: "1238732598",
				y_coordinate: "1238732598"
			},
		},
		category_id: category.value,
		tags: {
			data: tags.value.map((tag) => {
				return {
					tag_id: tag.id

				}
			}),
		}


	}
	addDataToDB({ input })


})


definePageMeta({
	layout: 'admin'
})
</script>










<template>
	<form class="flex space-x-10 p-10 w-full">

		<div class=" w-1/2 flex flex-col items-start justify-start">
			<BaseTextInput v-model="title" label="Title" name="title" rules="required" />

			<SelectorsCategory v-model="category"></SelectorsCategory>

			<SelectorsTags v-model="tags"></SelectorsTags>


			<BaseTextInput v-model="venue" label="Venue" name="venue" rules="required" />


			<div class=" w-full bg-white  rounded">
				<h3 class="text-lg mb-4">Description</h3>
				<textarea v-model="description"
					class="w-full h-40 p-2 border border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
					placeholder="Write your description here..."></textarea>
			</div>


		</div>




		<div class=" space-y-10   w-1/2 flex flex-col">
			<BaseTextInput type="number" v-model="price" label="Price" name="price" rules="required" />
			<BaseTextInput type="datetime-local" v-model="time" label="Time" name="time" rules="required" />


			<SelectorsCity v-model="city"></SelectorsCity>
			<SelectorsArea :city-id="city" v-model="area"></SelectorsArea>




			<div>
				<label class="block text-sm font-medium text-gray-700">
					Image
				</label>
				<div
					class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
					<div class="space-y-1 text-center">
						<svg class="mx-auto h-12 w-12 text-gray-700" stroke="currentColor"
							fill="none" viewBox="0 0 48 48" aria-hidden="true">
							<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
						<div class="flex text-sm text-gray-600">
							<label for="file-upload"
								class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
								<span class="text-gray-700">Upload a file</span>
								<input id="file-upload" name="file-upload" type="file"
									class="sr-only">
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
					class="flex w-full  justify-center  rounded-md bg-[#20c05c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1a9e4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
					Event
				</button>
			</div>



		</div>

	</form>
</template>