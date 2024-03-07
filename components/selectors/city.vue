<script setup>

import cityListQuery from '~/graphql/query/cities/list.gql'
import { useField } from "vee-validate";
// import { useDebounceFn } from "@vueuse/core";



const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
        modelValue: {
                type: String,
        },
})


/**----------------cities data fetch------------------ */
const cities = ref([])
const sort = ref([{ name: "ASC" }])
const filter = ref({})
const limit = ref(10)
const offset = ref(0)

const { onResult, onError, loading } = queryList(cityListQuery, {
        filter,
        order: sort,
        limit,
        offset

})

onResult(({ data }) => {
        cities.value = data.cities
})

/**-------------------------Handle select-------------------- */
const show = ref(false);
const {
        errorMessage,
        value: inputValue,
        meta,
} = useField("city", "required", {
        initialValue: props.modelValue,
});


const selectedItem = ref(null);
const setItem = (item) => {
        inputValue.value = item["id"];
        selectedItem.value = item;
        show.value = false;
        emit("update:modelValue", item.id);

}
const clear = () => {
        inputValue.value = null;
        selectedItem.value = null;
        show.value = false;
        emit("update:modelValue", null);
}


// onClickOutside(citySelect, (e) => (show.value = false));




</script>

<template>

        <div class="relative w-full" ref="citySelect">


                <div class="flex gap-x-2">
                        <!-- -----------------Label----------------- -->
                        <label class="text-sheger-gray-returnedObject100 pb-2" for="city">
                                City</label>

                </div>


                <!-- -----------------Heading---------------- -->

                <div @click="show = !show"
                        class="flex items-center justify-between rounded-md shadow-sm font-body border px-3 mb-2 py-3"
                        :class="[errorMessage ? 'border-red-500' : '']">
                        <!------------------- Leading icon----------- -->

                        <!-- -----------------Left Side----------------- -->

                        <div v-if="selectedItem" @click="show = true">

                                <div class="">
                                        {{ selectedItem.name }}
                                </div>

                        </div>
                        <div class="text-gray-500" v-else>
                                {{ "Select" }}
                        </div>

                        <!---------------- Chevron trailing icon ------------------->

                        <div v-if="selectedItem" @click="clear"
                                class="absolute hover:cursor-pointer inset-y-0 right-0 pr-3 flex items-center">
                                <Icon name="heroicons:x-mark-20-solid" color="gray" class="text-xl" />
                        </div>
                        <div v-else class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Icon name="tabler:chevron-down" color="gray" class="text-xl" />
                        </div>
                </div>

                <!-------------------------Body------------------------  -->
                <ul v-show="show"
                        class="absolute z-50 overflow-y-scroll overflow-x-hidden w-full bg-white border shadow max-h-56 h-auto rounded-md text-base">
                        <li v-for="           item            in            cities           " :key="item.id"
                                @click="setItem(item)">

                                <div
                                        class="flex items-center justify-between border-b select-none relative py-3 px-3 hover:bg-blue-50 cursor-pointer overflow-auto">
                                        <span class="block capitalize break-words">{{ item.name }}</span>

                                </div>

                        </li>
                </ul>
                <p :visible="errorMessage" class="mt-1 text-sm text-red-500 font-body">
                        {{ errorMessage }} &nbsp;
                </p>
        </div>

</template>