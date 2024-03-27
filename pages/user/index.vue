<script setup>
import { useField, useForm } from "vee-validate"
const { handleSubmit } = useForm();
import { toast } from "vue3-toastify";
import getUser from "~/graphql/query/users/item.gql";
import InfoUser from "~/graphql/query/users/info_aggregate.gql";
import { useAuthStore } from "~/stores/auth";
import updateUser from "~/graphql/mutations/user/edit.gql";
import imageUploadQuery from "@/graphql/mutations/uploadImage.gql"









const store = useAuthStore();
const singleUser = ref([]);
const image = ref()
const {
        mutate: imageUploadToDB,
        onDone: imageUploadToDBDone,
        loading: uploadLoading,
        onError: imageUploadToDBError,
} = anonymousMutation(imageUploadQuery, {
        clientId: "auth"
})


const {
        errorMessage: passwordError,
        value: password
} = useField("password", "password|required", {
        initialValue: "",
})

const {
        errorMessage: confirmPasswordError,
        value: confirmPassword
} = useField("confirmPassword", "password|required", {
        initialValue: "",
})



const { onResult, onError, loading, refetch } = singleQuery(getUser, {
        id: store.user.id
})
let furstName = ref()
onResult(({ data }) => {
        // console.log(data.users_by_pk)
        // console.log(data.users_by_pk.first_name)
        // console.log(data.users_by_pk.last_name)

        singleUser.value = { ...data?.users_by_pk }

        console.log(singleUser.value)
        console.log(singleUser.value.email)
        furstName.value = singleUser.value.first_name
})

onError((error) => {
        console.log("error", error.message)
        console.log("error", error)
})

const aggregateFilter = computed(() => store.user?.id)

const { onResult: onAggregateResult } = queryList(InfoUser, { filter: aggregateFilter, clientId: ref('auth') })

onAggregateResult(({ data }) => {
        followers.value = data.followers?.aggregate?.count
        following.value = data.followings?.aggregate?.count
})

const { mutate: userMutate, loading: userLoading, onError: userError, onDone: userDone } = anonymousMutation(updateUser, {
        clientId: "auth"
})

userDone((response) => {
        toast.success("You have updated your profile", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,

        });
        store.user = response.data?.update_users_by_pk
        store.photo_url = response.data?.update_users_by_pk?.photo_url
        // window.location.reload()
})

userError((error) => {
        toast.error("Something went wrong while updating profile");
        console.log(error.message);;
});



const onSubmit = () => {
        const { id, __typename, ...rest } = singleUser.value
        userMutate({
                userObject: { ...rest },
                id: store.user.id
        });
}

const pic = ref()
imageUploadToDBDone(({ data }) => {
        pic.value = data?.imageUpload?.urls
        let userObject = ref()
        // alert(data.imageUpload.urls)
        if (pic.value.length > 0) {
                userObject.value = {
                        photo_url: data.imageUpload.urls[0]
                }

                userMutate({
                        userObject: userObject.value,
                        id: store.user.id
                });
                refetch()

        }
        // this commented code is causing me problems of order...before the user is updated, the users data is fetched from the
        // userMutate({
        //         userObject: userObject,
        //         id: store.user.id
        // })
        // store.setUser(store.user.id);
})






const user = reactive({
        gender: 'male',
        profilePicture: '',
        // Add profile picture URL here
});

const followers = ref(0); // Sample followers count
const following = ref(0); // Sample following count
const likes = ref(2000); // Sample likes count
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


function saveChanges() {
        console.log('Changes saved:', user);
        // Replace with your actual logic for saving user data
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
                                                <button
                                                        class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                                                        Save Changes
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