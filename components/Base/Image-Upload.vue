<script setup>
import imageUploadQuery from "@/graphql/mutations/uploadImage.gql"
// image code
const props = defineProps({
    modelValue: {
        type: Array,
        default: []
    }
})
import { toast } from "vue3-toastify";

const emits = defineEmits(['update:modelvalue'])

const thumbnail = ref("");
const coverImage = ref(null);
const images = ref([]);
const immagesPreview = ref([]);
const uploadedFiles = computed({
    get() {
        return props.modelValue
    },
    set(newVal) {
        emits('update:modelValue', newVal)
    }
})

const removeImage = (index) => {
    immagesPreview.value.splice(index, 1);
    images.value.splice(index, 1);
};

const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                const base64Data = dataURL.split(",")[1];
                images.value.push(base64Data);
                if (!immagesPreview.value.includes(dataURL)) {
                    immagesPreview.value.push(dataURL);
                }
                if (thumbnail.value === "") {
                    thumbnail.value = dataURL;
                    coverImage.value = base64Data;
                }
            };
            reader.readAsDataURL(file);
        }
    }
};

const handleFileEvent = () => {
    document.getElementById("file_input").click();
};

const handleThumbnailChange = (image) => {
    thumbnail.value = image;
    coverImage.value = image.split(",")[1];
};

/*-----------------------------Image Upload Mutayion ---------------------------*/

const {
    mutate: imageUploadToDB,
    onDone: imageUploadToDBDone,
    loading: uploadLoading,
    onError: imageUploadToDBError,
} = anonymousMutation(imageUploadQuery, {
    clientId: "auth"
})

const handleUpload = () => {
    for (let i = 0; i < images.value.length; i++) {
        if (images.value[i] === coverImage.value) {
            images.value.splice(i, 1);
        }
    }
    images.value.unshift(coverImage.value);
    imageUploadToDB({ image: { images: images.value } });
}

imageUploadToDBDone((result) => {
    uploadedFiles.value = result.data.imageUpload.urls
    toast.success("Image uploaded done", {
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,

    });
})

imageUploadToDBError((error) => {
    toast.error("Something went wrong uploading images");
})




</script>

<template>
    <div class=" ">
        <div v-if="images.length === 0" class="flex w-full items-center justify-center">



            <div class="w-full py-4  h-full border border-dashed rounded-md flex justify-center items-center">
                <div class="flex-col flex justify-center items-center gap-y-1">
                    <Icon class="text-6xl text-gray-600" name="tabler:cloud-plus" />
                    <p class="text-xs font-normal text-gray-400">
                        Select and upload multiple images
                    </p>

                    <button type="button" @click="handleFileEvent"
                        class="px-16 py-2 mt-3 text-sm text-gray-600 border rounded-xl">
                        Browse File
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="mt-4 relative grid grid-cols-3 gap-y-2 gap-x-4">
                <div v-for="(image, index) in immagesPreview" :key="image.toString()" class="relative h-max">
                    <img :src="image.toString()" alt="recipe image"
                        class="aspect-video object-cover w-48 h-32 rounded-lg cursor-pointer"
                        @click="handleThumbnailChange(image.toString())" />

                    <span @click="removeImage(index)" class="absolute top-2 right-0">
                        <Icon name="uil:x" class="text-white" size="25px" />
                    </span>
                    <span v-if="thumbnail.toString() === image.toString()"
                        class="bg-opacity-30 bg-black absolute w-full h-full z-10 top-0 left-0 rounded-lg flex items-center justify-center">
                        <Icon name="wpf:like" size="35px" class="text-white" />
                    </span>
                </div>

            </div>
            <div class="flex justify-center gap-x-4 mt-4">
                <button
                    class="w-fit  h-fit flex gap-x-2 py-1 px-2 rounded-lg bg-[#2D2C3C] text-white items-center justify-center cursor-pointer"
                    type="button" @click="handleFileEvent">
                    Add Images
                    <Icon name="zondicons:add-outline" class="text-xl" />
                    <input class="opacity-0 hidden" ref="file" type="file" accept="image/*" multiple name="image" id=""
                        @change="handleFileSelect" />
                </button>
                <button type="button"
                    class="w-fit  h-fit flex gap-x-2 py-1 px-2 rounded-lg text-[#2D2C3C] border-2 border-[#2D2C3C] bg-white items-center justify-center cursor-pointer"
                    @click="handleUpload">
                    {{ uploadLoading ? 'uploading...' : ' Upload Image' }}
                    <Icon name="lucide:upload" />

                </button>
            </div>
        </div>
        <input class="opacity-0 w-60" ref="file" type="file" accept="image/*" multiple name="image" id="file_input"
            @change="handleFileSelect" />
    </div>
</template>