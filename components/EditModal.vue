<script setup>
const emits = defineEmits(["update:modelValue", "confirm"]);
const props = defineProps({
        modelValue: {
                type: Boolean,
                default: false,
        },
        title: {
                type: String,
                default: "",
        },
        autoClose: {
                type: Boolean,
                default: true,
        },
        wrapperClass: {
                type: String,
                default: "",
        },
});

const open = computed({
        get() {
                return props.modelValue;
        },
        set(newVal) {
                emits("update:modelValue", newVal);
        },
});
</script>
<template>
        <ClientOnly>
                <HeadlessTransitionRoot as="template" :show="open">
                        <HeadlessDialog as="div" class="relative z-[200]" @close="autoClose ? (open = false) : ''">
                                <HeadlessTransitionChild as="template" enter="ease-out duration-300"
                                        enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
                                        leave-from="opacity-100" leave-to="opacity-0">
                                        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-20" />
                                </HeadlessTransitionChild>

                                <div class="fixed inset-0 z-10 overflow-y-auto">
                                        <div
                                                class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                                                <HeadlessTransitionChild as="template" enter="ease-out duration-300"
                                                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                                                        leave="ease-in duration-200"
                                                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                                                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                                        <HeadlessDialogPanel
                                                                class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:p-6"
                                                                :class="wrapperClass ? wrapperClass : 'sm:max-w-lg'">
                                                                <div
                                                                        class="absolute top-0 right-0 flex justify-between w-full px-4 pt-4">
                                                                        <HeadlessDialogTitle as="h3"
                                                                                class="flex-1 text-base font-semibold leading-6 text-gray-900">
                                                                                <slot name="Heading" />
                                                                        </HeadlessDialogTitle>
                                                                        <button type="button"
                                                                                class="text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-200"
                                                                                @click="open = false">
                                                                                <span class="sr-only">Close</span>
                                                                                <Icon name="ion:close-outline"
                                                                                        width="25" height="25"
                                                                                        class="w-6 h-6" />
                                                                        </button>
                                                                </div>
                                                                <slot name="content" />
                                                        </HeadlessDialogPanel>
                                                </HeadlessTransitionChild>
                                        </div>
                                </div>
                        </HeadlessDialog>
                </HeadlessTransitionRoot>
        </ClientOnly>
</template>