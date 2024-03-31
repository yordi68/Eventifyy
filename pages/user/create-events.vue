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