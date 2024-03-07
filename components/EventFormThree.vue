<script setup>
const description = ref('');
const title = ref('');

function submitDescription() {
        console.log('Submitted description:', description.value);
}

const isOpen = ref(false);

// Dropdown 1
const isOpen1 = ref(false);

function toggleDropdown1() {
        isOpen1.value = !isOpen1.value;
}

function closeDropdown1() {
        isOpen1.value = false;
}

// Dropdown 2
const isOpen2 = ref(false);

function toggleDropdown2() {
        isOpen2.value = !isOpen2.value;
}

function closeDropdown2() {
        isOpen2.value = false;
}
</script>










<template>
        <div class="flex space-x-10 p-10 w-full">


                <div class="p-10 w-1/2 flex flex-col items-start justify-start">
                        <div class="max-w-md w-full  p-4 rounded">
                                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                <input v-model="title" type="text" id="title" name="title"
                                        class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        <div class="max-w-md w-full bg-white p-4 rounded">
                                <h3 class="text-lg mb-4">Description</h3>
                                <textarea v-model="description"
                                        class="w-full h-40 p-2 border border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
                                        placeholder="Write your description here..."></textarea>
                        </div>





                        <div class="max-w-md w-full p-4">


                                <div class="relative inline-block text-left max-w-md w-5/6 ">
                                        <div>
                                                <label for="title"
                                                        class="block text-sm pb-2 font-medium text-gray-700">Category</label>
                                                <button @click="toggleDropdown1" type="button"
                                                        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                                        Options
                                                        <!-- Heroicon name: solid/chevron-down -->
                                                        <svg class="-mr-1 ml-2 h-5 w-5"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                                fill="currentColor" aria-hidden="true">
                                                                <path fill-rule="evenodd"
                                                                        d="M10 12l-8-8H2l8 8 8-8h-1.414L10 13.414 3.414 7H2l8 8 8-8h-1.414L10 12z"
                                                                        clip-rule="evenodd" />
                                                        </svg>
                                                </button>
                                        </div>

                                        <div v-if="isOpen1"
                                                class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <div class="py-1" role="none">
                                                        <a href="#"
                                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem">Option 1</a>
                                                        <a href="#"
                                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem">Option 2</a>
                                                        <a href="#"
                                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem">Option 3</a>
                                                </div>
                                        </div>
                                </div>
                        </div>

                </div>




                <div class=" space-y-10  p-10 w-1/2 flex flex-col">
                        <div class="max-w-md w-full bg-white p-4 rounded">
                                <label for="title" class="block text-sm font-medium text-gray-700">Venue</label>
                                <input v-model="title" type="text" id="title" name="title"
                                        class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                        </div>


                        <div class="relative inline-block text-left p-4 ">
                                <div>
                                        <label for="title"
                                                class="block text-sm pb-2 font-medium text-gray-700">Location</label>
                                        <button @click="toggleDropdown2" type="button"
                                                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                                Options
                                                <!-- Heroicon name: solid/chevron-down -->
                                                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                                d="M10 12l-8-8H2l8 8 8-8h-1.414L10 13.414 3.414 7H2l8 8 8-8h-1.414L10 12z"
                                                                clip-rule="evenodd" />
                                                </svg>
                                        </button>
                                </div>

                                <div v-if="isOpen2"
                                        class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <div class="py-1" role="none">
                                                <a href="#"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        role="menuitem">Option 1</a>
                                                <a href="#"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        role="menuitem">Option 2</a>
                                                <a href="#"
                                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                        role="menuitem">Option 3</a>
                                        </div>
                                </div>
                        </div>


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



                </div>

        </div>
</template>