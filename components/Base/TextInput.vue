<script setup>
import { useField } from "vee-validate";
// import Visible from "@/plugins/visible";
const props = defineProps({
        modelValue: {
                type: [String, Number, Boolean],
                default: undefined,
        },

        placeholder: {
                type: String,
                default: "Write here ..."
        },
        name: {
                type: String,
                default: undefined,
                required: true,
        },
        id: {
                type: String,
                default: undefined,
                required: false,
        },
        type: {
                type: String,
                default: "text",
                required: false,
        },

        label: {
                type: String,
                default: undefined,
                required: false,
        },
        rules: {
                type: [String, Object],
                default: "",
                required: false,
        },
});

const emit = defineEmits(["update:modelValue"]);

const {
        errorMessage,
        value: inputValue,
        meta,
} = useField(props.name, props.rules, {
        initialValue: props.modelValue,
});

const type = ref(props.type);
const set = (event) => {
        emit("update:modelValue", event.target.value);
};


watch(
        () => props.modelValue,
        (newVal) => {
                if (props.type == "datetime-local") {
                        const parsedDate = new Date(newVal);
                        // Format the date without time zone information
                        const formattedDate = `${parsedDate.getFullYear()}-${String(
                                parsedDate.getMonth() + 1
                        ).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(
                                2,
                                "0"
                        )}T${String(parsedDate.getHours()).padStart(2, "0")}:${String(
                                parsedDate.getMinutes()
                        ).padStart(2, "0")}`;

                        inputValue.value = formattedDate;
                }

                // else {
                //         inputValue.value = props.type == "number" ? Number(newVal) : newVal
                // };
        }
        , { immediate: true });
</script>
<template>
        <div class="w-full">
                <!-- -------------------Label----------------- -->
                <label class="text-gray-700" v-if="props.label" :for="props.id ? props.id : ''">
                        {{ props.label }}
                </label>
                <span v-if="props.showStar" class="text-red-500">*</span>
                <div class="relative rounded-md shadow-sm overflow-clip font-body group" :class="props.bodyClass">
                        <input v-model="inputValue" @input="set($event)" @change="set($event)" :type="type"
                                :placeholder="placeholder" :name="props.name" step="any" :id="id" :class="[

                        'border-[1px] p-3   border-gray-300 group-hover:border-new-tale focus:border-new-tale focus:ring-new-tale disabled:bg-gray-100 disabled:cursor-not-allowed',

                ]" class="block w-full text-base text-gray-500 placeholder-gray-500 rounded-md font-body focus:outline-none"
                                placeholder="Write here" />

                        <!-- -----------------Trailing--------------- -->

                </div>
                <p class="col-span-5 mt-1 text-sm text-red-600 transition-all duration-300 font-body"
                        :class="errorMessage ? 'h-5' : 'h-0'" :visible="errorMessage">
                        {{ errorMessage }}
                </p>
        </div>
</template>