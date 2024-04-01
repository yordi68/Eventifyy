<script setup>
import { toast } from "vue3-toastify";
import getUser from "~/graphql/query/users/item.gql";
import InfoUser from "~/graphql/query/users/info_aggregate.gql";
import { useUserStore } from "~/stores/auth";
import updateUser from "~/graphql/mutations/user/edit.gql";
import imageUploadQuery from "@/graphql/mutations/uploadImage.gql"





const userStore = useUserStore()

const singleUser = ref([]);

/************************ Fetch a single user data ***************************/

const { onResult, onError, loading, refetch } = singleQuery(getUser, {
        id: userStore.id
})
onResult(({ data }) => {

        singleUser.value = { ...data?.users_by_pk }
})

onError((error) => {
        toast.error("Something went wrong try again", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        })
})



/************************ Get Follower and Following Count ***************************/


const aggregateFilter = computed(() => userStore.id)

const { onResult: onAggregateResult } = queryList(InfoUser, { filter: aggregateFilter, clientId: ref('auth') })

onAggregateResult(({ data }) => {
        followers.value = data.followers?.aggregate?.count
        following.value = data.followings?.aggregate?.count
})






/************************ User Profile Update Mutation ***************************/


const { mutate: userMutate, onDone: userDone, onError: userError, loading: userLoading } = anonymousMutation(updateUser, {
        clientId: "auth"
})

const onSubmit = () => {
        const { id, __typename, ...rest } = singleUser.value
        userMutate({
                userObject: { ...rest },
                id: userStore.id
        });
        // refetch()
}


userDone(async (response) => {
        toast.success("You have updated your profile", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,

        });

        // await store.fetchUser(response.data?.update_users_by_pk.id)
        // await userStore.setuser(response.data?.update_users_by_pk.id)
        userStore.setuser(response?.data?.update_users_by_pk.id).then((result) => {
                // router.replace('/')
                singleUser.value = { ...response?.data?.update_users_by_pk }

        }).catch((error) => {
                toast.error("Something went wrong try again", {
                        transition: toast.TRANSITIONS.FLIP,
                        position: toast.POSITION.TOP_RIGHT,
                })
        })
})

userError((error) => {
        toast.error("Something went wrong while updating profile");
});






/************************ Image Upload Mutation ***************************/


const image = ref()
const pic = ref()

const {
        mutate: imageUploadToDB,
        onDone: imageUploadToDBDone,
        loading: imageUploadToDBLoading,
        onError: imageUploadToDBError,
} = anonymousMutation(imageUploadQuery, {
        clientId: "auth"
})


imageUploadToDBDone(({ data }) => {
        pic.value = data?.imageUpload?.urls
        let userObject = ref()
        if (pic.value.length > 0) {
                userObject.value = {
                        photo_url: data.imageUpload.urls[0]
                }

                userMutate({
                        userObject: userObject.value,
                        id: userStore.id
                });
                userStore.photo_url = data.imageUpload.urls[0]
        }
})


imageUploadToDBError(() => {
        toast.error("Something went wrong while uploading profile Picture", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        })
})





const user = reactive({
        profilePicture: '',
});

const followers = ref(0);
const following = ref(0);
const previewImage = ref(null)

function handleProfilePictureChange(event) {
        previewImage.value = URL.createObjectURL(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
                user.profilePicture = e.target.result;
                image.value = user.profilePicture.split(",")[1];
                imageUploadToDB(
                        { image: { images: [image.value] } }
                );
        };

        reader.readAsDataURL(file);
}


definePageMeta({
        layout: 'admin',
        middleware: 'auth',
})

</script>


<template>
        <div class="grid grid-cols-2" v-if="singleUser">

                <!-- User Profile Content -->
                <div class="flex-1 p-8">
                        <h1 class="text-2xl font-bold mb-4">User Profile</h1>

                        <!-- Profile Section -->
                        <div class="flex items-center mb-10">
                                <!-- Profile Image and Stats -->
                                <div class="mr-6">
                                        <!-- Profile Picture and Stats -->
                                        <div class="flex items-center mb-4 relative">
                                                <!-- Profile Picture -->

                                                <div class="mr-4 relative">

                                                        <label for="profile-picture"
                                                                class="block text-sm font-medium text-gray-700 mb-8">Profile
                                                                Picture</label>
                                                        <input type="file" id="profile-picture" name="profile-picture"
                                                                @change="handleProfilePictureChange" class="hidden">
                                                        <label for="profile-picture" class="cursor-pointer relative">
                                                                <Icon name="ic:baseline-plus"
                                                                        v-if="!imageUploadToDBLoading"
                                                                        class="absolute bottom-0 right-0 bg-black !text-white box-content p-2 rounded-full !text-lg" />
                                                                <Icon name="line-md:loading-twotone-loop" v-else
                                                                        class="absolute bottom-0 right-0 bg-black !text-white box-content p-2 rounded-full !text-lg" />
                                                                <img v-if="singleUser.photo_url"
                                                                        :src="previewImage || singleUser.photo_url"
                                                                        alt="Profile Picture"
                                                                        class="h-24 w-24 rounded-full shadow-md">
                                                                <div v-else
                                                                        class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                                                                        Upload
                                                                </div>
                                                        </label>
                                                </div>
                                                <!-- Stats -->
                                                <div>
                                                        <div class="font-bold">{{ followers }}</div>
                                                        <div class="text-gray-500">Followers</div>
                                                </div>
                                                <div class="ml-6">
                                                        <div class="font-bold">{{ following }}</div>
                                                        <div class="text-gray-500">Following</div>
                                                </div>
                                                <!-- <div class="ml-6">
                                                        <div class="font-bold">{{ likes }}</div>
                                                        <div class="text-gray-500">Likes</div>
                                                </div> -->
                                        </div>
                                        <form @submit.prevent="onSubmit">
                                                <!-- Profile Information -->
                                                <div class="flex mt-10 space-x-8">

                                                        <BaseTextInput v-model="singleUser.first_name"
                                                                label="First Name" name="first_name" rules="required" />

                                                        <BaseTextInput v-model="singleUser.last_name" label="Last Name"
                                                                name="last_name" rules="required" />
                                                </div>

                                                <!-- Email and Phone Number -->
                                                <div class="flex mb-4 space-x-8">

                                                        <BaseTextInput v-model="singleUser.email" label="Email"
                                                                name="email" rules="required" type="email" />

                                                        <!-- Phone Number -->
                                                        <BaseTextInput v-model="singleUser.phone_number"
                                                                label="Phone Number" name="phone_number"
                                                                rules="required" type="Number" />
                                                </div>

                                                <!-- Save Button -->
                                                <button @click.prevent="onSubmit" type="submit" v-if="!userLoading"
                                                        class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                                                        Save Changes
                                                </button>
                                                <button type="submit" v-else
                                                        class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                                                        <div role="status">
                                                                <svg aria-hidden="true"
                                                                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                                                                        viewBox="0 0 100 101" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                                fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                                fill="currentFill" />
                                                                </svg>
                                                                <span class="sr-only">Loading...</span>
                                                        </div>
                                                </button>
                                        </form>
                                </div>
                        </div>

                </div>

                <!-- <div class="p-8">

                        <h1 class="text-2xl font-bold mb-4">Password Setting</h1>

                        <div class="flex flex-col mb-4 space-y-4">

                                <BaseTextInput v-model="password" label="Password" name="password" rules="required"
                                        type="password" />


                                <BaseTextInput v-model="confirmPassword" label="Confirm Password" name="confirmPassword"
                                        rules="required" type="password" />

                        </div>
                        <button @click.prevent="onSubmit" type="submit"
                                class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                                Change Password
                        </button>
                </div> -->

        </div>
</template>