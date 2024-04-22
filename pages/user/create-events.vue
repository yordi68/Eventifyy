<script setup>
import { useForm } from "vee-validate"
import addEvent from "~/graphql/mutations/events/add.gql"
import { toast } from "vue3-toastify";




const { handleSubmit } = useForm();
const router = useRouter();

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
const uploadedFiles = ref([])
const lat = ref(0);
const long = ref(0);




const {
	mutate: addEventMutate,
	onDone: addEventDone,
	onError: addEventError,
	loading: addEventLoading
} = anonymousMutation(addEvent, {
	clientId: "auth"
})


const onSubmit = handleSubmit(() => {
	const coverUrl = uploadedFiles.value.shift()
	let input = {
		title: title.value,
		description: description.value,
		price: parseInt(price.value),
		time: time.value,
		venue: venue.value,
		thumbnail: coverUrl,
		location: {
			data: {
				city_id: city.value,
				area_id: area.value,

				location: {
					type: "Point",
					coordinates: [parseFloat(lat.value), parseFloat(long.value)]
				},
			},
		},
		category_id: category.value,
		tags: {
			data: tags.value.map((tag) => {
				return {
					tag_id: tag

				}
			}),
		},

		event_medias: {
			data: uploadedFiles.value.map((item) => {
				return {
					media: {
						data: {
							url: item
						}
					}
				}
			})
		}
	}
	addEventMutate({ input })


})

addEventDone(({ data }) => {
	toast.success("Event successfully added", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,

	});
	router.push(`/events/${data.insert_events.returning[0].id}`)
});

addEventError((error) => {
	toast.error("Something went wrong", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,

	});
	console.log(error)

});








definePageMeta({
	layout: 'admin',
	middleware: 'auth',
})
</script>










<template>
	<form class="grid grid-cols-2 space-x-10 p-10 w-full">

		<div class="flex flex-col items-start justify-start">
			<BaseTextInput v-model="title" label="Title" name="title" rules="required" />

			<SelectorsCategory v-model="category"></SelectorsCategory>

			<SelectorsTags v-model="tags"></SelectorsTags>


			<BaseTextInput v-model="venue" label="Venue" name="venue" rules="required" />

			<BaseTextInput type="String" v-model="price" label="Price" name="price" rules="required" />

			<div class=" w-full bg-white  rounded">
				<h3 class="text-lg mb-4">Description</h3>
				<textarea v-model="description"
					class="w-full h-40 p-2 border border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
					placeholder="Write your description here..."></textarea>
			</div>


		</div>




		<div class=" space-y-10  flex flex-col">
			<BaseTextInput type="datetime-local" v-model="time" label="Time" name="time" rules="required" />

			<SelectorsCity v-model="city"></SelectorsCity>
			<SelectorsArea :city-id="city" v-model="area"></SelectorsArea>

			<div class="flex items-center justify-between w-full gap-x-6">
				<BaseTextInput placeholder="9.014253" type="number" v-model="lat" label="Latitude" name="labelatitude"
					rules="required" />
				<BaseTextInput placeholder="39.014253" type="number" v-model="long" label="Longitude" name="longitude"
					rules="required" />

			</div>

			<BaseImageUpload v-model="uploadedFiles" />


		</div>

		<div class="col-span-2">
			<button type="submit" @click.prevent="onSubmit" v-if="!addEventLoading"
				class="flex w-full  justify-center  rounded-md bg-[#2D2C3C]  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
				Event
			</button>
			<div>
				<button type="submit" v-if="addEventLoading"
					class="flex w-full  justify-center items-center  rounded-md bg-[#2D2C3C] hover:bg-[#2D2C3C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

					<div role="status">
						<Icon name="eos-icons:loading"
							class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" />
						<span class="sr-only">Loading...</span>
					</div>
				</button>

			</div>
		</div>

	</form>
</template>