<script setup>
// import { ChevronDownIcon } from "@heroicons/vue/outline";
// import { onClickOutside } from "@vueuse/core";
import { useField } from "vee-validate";
import tagListQuery from '~/graphql/query/tags/list.gql'


const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
        modelValue: {
                type: Array,
        },

});


/**----------------Tags data fetch------------------ */
const search = ref("")

const tags = ref([])
const sort = ref([{ name: "ASC" }])
const limit = ref(10)
const offset = ref(0)
const filter = computed(() => {
        let query = {
                name: {
                        _ilike: `%${search.value}%`
                }
        }

        return query

})

const { onResult, onError, loading } = queryList(tagListQuery, {
        filter,
        order: sort,
        limit,
        offset

})

onResult(({ data }) => {
        if (data.tags) {
                tags.value = data.tags
                inputValue.value = props.modelValue
                selectedTags.value = tags.value.filter(tag => props.modelValue.some(id => id === tag.id))



        }

})



/**------------------Handle tag select--------------- */
const show = ref(false);
const tagSelect = ref(null);


const {
        errorMessage,
        value: inputValue,
        meta,
} = useField("tags", props.rules, {
        initialValue: props.modelValue,
});

const selectedTags = ref([]);


const addTag = (tag) => {

        if (selectedTags.value.find(t => t.id === tag.id)) {
                return;
        }

        show.value = false;

        selectedTags.value.push(tag)
        emit("update:modelValue", selectedTags.value);

};

const removeTag = (index) => {
        selectedTags.value.splice(index, 1)
        emit("update:modelValue", selectedTags.value);

};


console.log(props.modelValue, tags.value);








watch(() => props.modelValue, (newValue) => {
        inputValue.value = props.modelValue
        selectedTags.value = tags.value.filter(tag => props.modelValue.some(id => id === tag.id))

},
        {
                immediate: true,
                deep: true
        }
)







// onClickOutside(tagSelect, (e) => (show.value = false));
</script>


<template>
        <div class="relative w-full">

                <div class="flex gap-x-2">
                        <!-- -----------------Label----------------- -->

                        <label class="pb-2 text-sheger-gray-100" for="tags">Tags</label>
                </div>
                <div class="flex flex-wrap justify-start gap-3 my-2" v-if="show">
                        <div class="flex items-center justify-center break-words px-1 bg-gray-200"
                                v-for="(tag, i) of selectedTags" :key="tag.id">
                                <span class="flex flex-wrap w-full overflow-hidden text-sm whitespace-nowrap">
                                        {{ tag.name }}
                                </span>
                                <Icon name="heroicons-solid:x"
                                        class="w-4 h-4 ml-1 hover:cursor-pointer hover:text-primary"
                                        @click="removeTag(i)" />
                        </div>
                </div>
                <div
                        class="flex flex-wrap bg-white relative pr-7 rounded-md py-1.5 px-2 gap-1 border-gray-300 border-[1px]">
                        <input class="flex-1 w-full border-none rounded-md focus:outline-none min-w-5" name="select"
                                @click="show = true" v-model="search" placeholder="Tag name" />

                </div>
                <div class="flex flex-wrap justify-start gap-3 my-2" v-if="!show">
                        <div class="flex items-center justify-center break-words px-1 bg-gray-200"
                                v-for="(tag, i) of selectedTags" :key="tag.id">
                                <span class="flex flex-wrap w-full overflow-hidden text-sm whitespace-nowrap">
                                        {{ tag.name }}
                                </span>
                                <Icon name="heroicons-solid:x"
                                        class="w-4 h-4 ml-1 hover:cursor-pointer hover:text-primary"
                                        @click="removeTag(i)" />
                        </div>
                </div>
                <ul ref="tagSelect" v-show="show"
                        class="absolute z-10 w-full overflow-auto text-base bg-white border shadow border-primary max-h-56 rounded-b-md">
                        <li class="h-1">
                                <h-progress v-if="loading" class="w-full rounded-xl" color1="bg-primary-lite"
                                        color2="bg-primary" color3="bg-primary-dark" height="h-1"></h-progress>
                        </li>
                        <li v-for="(tag, index) in tags" @click="addTag(tag)"
                                class="relative px-3 py-3 text-gray-600 border-b cursor-pointer select-none hover:bg-primary/30"
                                :key="index">
                                <div class="flex items-center justify-between">
                                        <span class="block font-semibold text-gray-600 truncate">
                                                {{ tag.name }}
                                        </span>

                                </div>
                        </li>
                </ul>
                <p :visible="errorMessage" class="mt-2 text-sm text-red-600">
                        {{ errorMessage }} &nbsp;
                </p>
        </div>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
        width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px white;
        border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
        background: #d34553;
        border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
        background: #d34553;
}
</style>