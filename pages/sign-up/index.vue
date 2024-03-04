<script setup>
import { useField, useForm } from "vee-validate"
const { handleSubmit } = useForm();

const { errorMessage: firstNameError,
        value: firstName,
} = useField("firstName", "required", {
        initialValue: "",
})

const { errorMessage: lastNameError,
        value: lastName,
} = useField("lastName", "required", {
        initialValue: "",
})


const {
        errorMessage: emailError,
        value: email,
} = useField("email", "email|required", {
        initialValue: "",
});

const {
        errorMessage: passwordError,
        value: password,
} = useField("password", "password|required", {
        initialValue: "",
});

const onSubmit = handleSubmit(() => {
        console.log("submitted")
        console.log(firstName, lastName, email, password)
})


</script>




<template>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create
                                your account</h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" action="#" method="POST">

                                <div>
                                        <label for="firstName"
                                                class="block text-sm font-medium leading-6 text-gray-900">
                                                First Name</label>
                                        <span class="error-style">{{ firstNameError }}</span>
                                        <div class="mt-2">
                                                <input id="firstName" name="firstName" type="text" autocomplete="email"
                                                        v-model="firstName" required
                                                        class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#20c05c] sm:text-sm sm:leading-6" />
                                        </div>
                                </div>



                                <div>
                                        <label for="lastName"
                                                class="block text-sm font-medium leading-6 text-gray-900">Last
                                                Name</label>
                                        <span class="error-style">{{ lastNameError }}</span>

                                        <div class="mt-2">
                                                <input id="lastName" name="lastName" type="text" autocomplete="email"
                                                        v-model="lastName" required
                                                        class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#20c05c] sm:text-sm sm:leading-6" />
                                        </div>
                                </div>

                                <div>
                                        <label for="email"
                                                class="block text-sm font-medium leading-6 text-gray-900">Email
                                                address</label>
                                        <span class="error-style">{{ emailError }}</span>

                                        <div class="mt-2">
                                                <input id="email" name="email" type="email" autocomplete="email"
                                                        v-model="email" required
                                                        class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#20c05c] sm:text-sm sm:leading-6" />
                                        </div>
                                </div>

                                <div>
                                        <div class="flex items-center justify-between">
                                                <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                <!-- <div class="text-sm">
                          <a href="#" class="font-semibold text-[#20c05c] hover:text-indigo-500">Forgot password?</a>
                        </div> -->
                                        </div>
                                        <span class="error-style">{{ passwordError }}</span>

                                        <div class="mt-2">
                                                <input id="password" name="password" type="password" v-model="password"
                                                        autocomplete="current-password" required
                                                        class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#20c05c] sm:text-sm sm:leading-6" />
                                        </div>
                                </div>

                                <div>
                                        <button type="submit" @click.prevent="onSubmit"
                                                class="flex w-full justify-center rounded-md bg-[#20c05c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1a9e4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                                up</button>
                                </div>
                        </form>

                        <p class="mt-10 text-center text-sm text-gray-500">
                                Already a member?
                                {{ ' ' }}
                                <NuxtLink to="/login"
                                        class="font-semibold leading-6 text-[#20c05c] hover:text-[#1a9e4e]">
                                        Login
                                </NuxtLink>
                                <!-- <a href="#" >Sign in</a> -->
                        </p>
                </div>
        </div>
</template>