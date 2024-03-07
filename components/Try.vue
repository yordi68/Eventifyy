<template>
        <section class="max-w-4xl p-4 mx-auto bg-white rounded-md shadow-md dark:bg-white mt-10">
                <h1 class="text-lg font-bold text-black capitalize dark:text-black">Account settings</h1>
                <form>
                        <div class="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                                <div>
                                        <label class="text-black dark:text-black" for="username">Username</label>
                                        <input id="username" type="text"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>

                                <div>
                                        <label class="text-black dark:text-black" for="emailAddress">Email
                                                Address</label>
                                        <input id="emailAddress" type="email"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>

                                <div>
                                        <label class="text-black dark:text-black" for="password">Password</label>
                                        <input id="password" type="password"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>

                                <div>
                                        <label class="text-black dark:text-black" for="passwordConfirmation">Password
                                                Confirmation</label>
                                        <input id="passwordConfirmation" type="password"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>
                                <div>
                                        <label class="text-black dark:text-black" for="color">Color</label>
                                        <input id="color" type="color"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>
                                <div>
                                        <label class="text-black dark:text-black" for="select">Select</label>
                                        <select
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                                <option>Surabaya</option>
                                                <option>Jakarta</option>
                                                <option>Tangerang</option>
                                                <option>Bandung</option>
                                        </select>
                                </div>
                                <div>
                                        <label class="text-black dark:text-black" for="range">Range</label>
                                        <input id="range" type="range"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>
                                <div>
                                        <label class="text-black dark:text-black" for="date">Date</label>
                                        <input id="date" type="date"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                </div>
                                <div>
                                        <label class="text-black dark:text-black" for="textarea">Text Area</label>
                                        <textarea id="textarea"
                                                class="block w-full px-3 py-1 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                                </div>
                                <div>
                                        <label class="block text-sm font-medium text-black">Image</label>
                                        <div
                                                class="mt-1 flex justify-center px-4 pt-3 pb-4 border-2 border-gray-300 border-dashed rounded-md">
                                                <div class="space-y-1 text-center">
                                                        <svg class="mx-auto h-8 w-8 text-black" stroke="currentColor"
                                                                fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        stroke-width="2" stroke-linecap="round"
                                                                        stroke-linejoin="round" />
                                                        </svg>
                                                        <div class="flex text-xs text-gray-600">
                                                                <label for="file-upload"
                                                                        class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                        <span class="">Upload a file</span>
                                                                        <input id="file-upload" name="file-upload"
                                                                                type="file" class="sr-only">
                                                                </label>
                                                                <p class="pl-1 text-black">or drag and drop</p>
                                                        </div>
                                                        <p class="text-xxs text-black">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div class="flex justify-end mt-4">
                                <button
                                        class="px-4 py-2 leading-5 text-sm text-black transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                        </div>
                </form>
        </section>


</template>