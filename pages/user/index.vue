<script setup>
import Sidebar from '@/components/Sidebar.vue';

const user = reactive({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        gender: 'male',
        phoneNumber: '+1234567890',
        profilePicture: '' // Add profile picture URL here
});

const followers = ref(1000); // Sample followers count
const following = ref(500); // Sample following count
const likes = ref(2000); // Sample likes count

function handleProfilePictureChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
                user.profilePicture = e.target.result;
        };

        reader.readAsDataURL(file);
}

function saveChanges() {
        console.log('Changes saved:', user);
        // Replace with your actual logic for saving user data
}

definePageMeta({
        layout: 'admin'
})

</script>


<template>
        <div class="flex">

                <!-- User Profile Content -->
                <div class="flex-1 p-8">
                        <h1 class="text-2xl font-bold mb-4">User Profile</h1>

                        <!-- Profile Section -->
                        <div class="flex items-center mb-10">
                                <!-- Profile Image and Stats -->
                                <div class="mr-6">
                                        <!-- Profile Picture and Stats -->
                                        <div class="flex items-center mb-4">
                                                <!-- Profile Picture -->
                                                <div class="mr-4">
                                                        <label for="profile-picture"
                                                                class="block text-sm font-medium text-gray-700 mb-8">Profile
                                                                Picture</label>
                                                        <input type="file" id="profile-picture" name="profile-picture"
                                                                @change="handleProfilePictureChange" class="hidden">
                                                        <label for="profile-picture" class="cursor-pointer">
                                                                <img v-if="user.profilePicture"
                                                                        :src="user.profilePicture" alt="Profile Picture"
                                                                        class="h-24 w-24 rounded-full shadow-md">
                                                                <div v-else
                                                                        class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                                                                        Upload</div>
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
                                                <div class="ml-6">
                                                        <div class="font-bold">{{ likes }}</div>
                                                        <div class="text-gray-500">Likes</div>
                                                </div>
                                        </div>

                                        <!-- Profile Information -->
                                        <div class="flex mt-10">
                                                <!-- First Name -->
                                                <div class="mb-4 mr-4">
                                                        <label for="first-name"
                                                                class="block text-sm font-medium text-gray-700 mb-2">First
                                                                Name</label>
                                                        <input type="text" id="first-name" v-model="user.firstName"
                                                                class="mt-1 p-2 block w-72 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                                </div>

                                                <!-- Last Name -->
                                                <div class="mb-4">
                                                        <label for="last-name"
                                                                class="block text-sm font-medium text-gray-700 mb-2">Last
                                                                Name</label>
                                                        <input type="text" id="last-name" v-model="user.lastName"
                                                                class="mt-1 p-2 block w-72 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                                </div>
                                        </div>

                                        <!-- Email and Phone Number -->
                                        <div class="flex mb-4">
                                                <!-- Email -->
                                                <div class="mr-4">
                                                        <label for="email"
                                                                class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                        <input type="email" id="email" v-model="user.email"
                                                                class="mt-1 p-2 block w-72 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                                </div>

                                                <!-- Phone Number -->
                                                <div>
                                                        <label for="phone-number"
                                                                class="block text-sm font-medium text-gray-700 mb-2">Phone
                                                                Number</label>
                                                        <input type="tel" id="phone-number" v-model="user.phoneNumber"
                                                                class="mt-1 p-2 block w-72 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                                </div>
                                        </div>

                                        <!-- Gender -->
                                        <div class="mb-4">
                                                <label for="gender"
                                                        class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                                <select id="gender" v-model="user.gender"
                                                        class="mt-1 p-2 block w-56 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                </select>
                                        </div>
                                </div>
                        </div>

                        <!-- Save Button -->
                        <button @click="saveChanges"
                                class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Save
                                Changes</button>
                </div>
        </div>
</template>