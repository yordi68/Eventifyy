<script setup>
const props = defineProps({
        modelValue: {
                type: Object,
                required: true
        }
})

const emit = defineEmits(['update:modelValue'])

const query = useRoute().query



/*-----------------  Price Filter      -----------*/
const price = ref([])
if (query.price) {
        if (typeof (query.price) == 'string') {
                price.value.push(query.price)
        }
        else {
                price.value = query.price
        }
}

const handlePriceInput = (event) => {
        if (event.target.checked) {
                price.value.push(event.target.value)
        } else {
                price.value = price.value.filter(priceFilter => priceFilter !== event.target.value)
        }
}

watch(price, (newValue) => {
        if (newValue.length > 0)
                useRouter().push({
                        query: { ...useRoute().query, price: price.value }
                })
        else {
                const { price, ...rest } = useRoute().query
                useRouter().push({
                        query: { ...rest }
                })
        }
}, { immediate: true, deep: true })


const location = ref([])
if (query.location) {
        if (typeof (query.location) == 'string') {
                location.value.push(query.location)
        }
        else {
                location.value = query.location
        }
}

const handleLocationInput = (event) => {
        if (event.target.checked) {
                location.value.push(event.target.value)
        } else {
                location.value = location.value.filter(locationFilter => locationFilter !== event.target.value)
        }
}

watch(location, (newValue) => {
        if (newValue.length > 0)
                useRouter().push({
                        query: { ...useRoute().query, location: location.value }
                })
        else {
                const { location, ...rest } = useRoute().query
                useRouter().push({
                        query: { ...rest }
                })
        }
}, { immediate: true, deep: true })

const category = ref([])
if (query.category) {
        if (typeof (query.category) === 'string') {
                category.value.push(query.category)
        } else {
                category.value = query.category
        }
}

const handleCategoryInput = (event) => {
        if (event.target.checked) {
                category.value.push(event.target.value)
        } else {
                category.value = category.value.filter(categoryFilter => categoryFilter !== event.target.value)
        }
}

watch(category, (newValue) => {
        if (newValue.length > 0) {
                useRouter().push({
                        query: { ...useRouter().query, category: category.value }
                })
        } else {
                const { category, ...rest } = useRoute().query
                useRouter().push({
                        query: { ...rest }
                })
        }
}, { immediate: true, deep: true })

const date = computed({
        get() {
                return props.modelValue
        },
        set(value) {
                emit('update:modelValue', value)
        }
})

const handleDateInput = (event) => {
        if (!date.value[event.target.value]) date.value[event.target.value] = {}
        date.value[event.target.value].isChecked = event.target.checked
}

</script>



<template>
        <div class="flex flex-col items-start pl-20 pb-48 justify-center border-gray-200 border-r-1 ">

                <div class="flex flex-col space-y-2">
                        <h4 class="my-4 font-bold">Price</h4>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="free"
                                        :checked="price.includes('free')" @input="handlePriceInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Free
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="paid" @input="handlePriceInput"
                                        :checked="price.includes('paid')"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Paid
                                </label>
                        </div>
                        <!-- <div class="flex items-center me-4">
                                <input id="inline-2-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-2-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        2</label>
                        </div>
                        <div class="flex items-center me-4">
                                <input checked id="inline-checked-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checked-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        checked</label>
                        </div> -->
                        <!-- <div class="flex items-center">
                                <input disabled id="inline-disabled-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-disabled-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline
                                        disabled</label>
                        </div> -->
                </div>
                <hr class="my-6 border-gray-200 w-3/4 ">

                <div class="flex flex-col space-y-2">
                        <h4 class="my-4 font-bold">Location</h4>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Addis Ababa"
                                        @input="handleLocationInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Addis Ababa
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Hawasa" @input="handleLocationInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hawassa
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Adama" @input="handleLocationInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adama
                                </label>
                        </div>
                        <!-- <div class="flex items-center me-4">
                                <input id="inline-2-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-2-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        2</label>
                        </div>
                        <div class="flex items-center me-4">
                                <input checked id="inline-checked-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checked-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        checked</label>
                        </div> -->
                        <!-- <div class="flex items-center">
                                <input disabled id="inline-disabled-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-disabled-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline
                                        disabled</label>
                        </div> -->
                </div>
                <hr class="my-6 border-gray-200 w-3/4">



                <div class="flex flex-col space-y-2">
                        <h4 class="my-4 font-bold">Date</h4>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="today" @input="handleDateInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Today
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="tomorrow" @input="handleDateInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tommorow
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="week" @input="handleDateInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This Week
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="month" @input="handleDateInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This Month
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="year" @input="handleDateInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This Year
                                </label>
                        </div>
                        <!-- <div class="flex items-center me-4">
                                <input id="inline-2-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-2-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        2</label>
                        </div>
                        <div class="flex items-center me-4">
                                <input checked id="inline-checked-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checked-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        checked</label>
                        </div> -->
                        <!-- <div class="flex items-center">
                                <input disabled id="inline-disabled-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-disabled-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline
                                        disabled</label>
                        </div> -->
                </div>
                <hr class="my-6 border-gray-200 w-3/4">



                <div class="flex flex-col space-y-2">
                        <h4 class="my-4 font-bold">Category</h4>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Technology"
                                        @input="handleCategoryInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Technology
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Industry"
                                        @input="handleCategoryInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Industry
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Manufacturing"
                                        @input="handleCategoryInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Manufacturing
                                </label>
                        </div>
                        <div class="flex items-center me-4 ">
                                <input id="inline-checkbox" type="checkbox" value="Sport" @input="handleCategoryInput"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sport
                                </label>
                        </div>
                        <!-- <div class="flex items-center me-4">
                                <input id="inline-2-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-2-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        2</label>
                        </div>
                        <div class="flex items-center me-4">
                                <input checked id="inline-checked-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-checked-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline
                                        checked</label>
                        </div> -->
                        <!-- <div class="flex items-center">
                                <input disabled id="inline-disabled-checkbox" type="checkbox" value=""
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="inline-disabled-checkbox"
                                        class="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline
                                        disabled</label>
                        </div> -->
                </div>
        </div>
</template>
