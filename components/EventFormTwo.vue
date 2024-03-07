<script setup>
const description = ref('');

function submitDescription() {
        console.log('Submitted description:', description.value);
}
</script>


<template>

        <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900"> Add Recipe</h2>


                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div class="sm:col-span-3">
                                <label for="first-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                <div class="mt-2">
                                        <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>


                        <div class="max-w-md w-full bg-white p-8 rounded shadow-lg">
                                <h2 class="text-2xl mb-4">Add a Description</h2>
                                <textarea v-model="description"
                                        class="w-full h-40 p-2 border border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
                                        placeholder="Write your description here..."></textarea>
                                <button @click="submitDescription"
                                        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                        </div>


                        <div class="sm:col-span-3">
                                <label for="last-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                <div class="mt-2">
                                        <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>


                        <div class="sm:col-span-3">
                                <label for="last-name"
                                        class=" text-sm font-medium leading-6 text-gray-900">Venue</label>
                                <div class="mt-2">
                                        <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>






                        <div class="sm:col-span-3">
                                <label for="last-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Ingredients</label>
                                <div class="mt-2">
                                        <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>


                        <div class="sm:col-span-3">
                                <label for="last-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Steps</label>
                                <div class="mt-2">
                                        <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>


                        <div class="col-span-full">
                                <label for="photo"
                                        class="block text-sm font-medium leading-6 text-gray-900">Images</label>
                                <div class="mt-2 flex items-center gap-x-3">
                                        <UserCircleIcon class="h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <button type="button"
                                                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Upload</button>
                                </div>
                        </div>






                </div>


        </div>




</template>

<script setup>

</script>