<script setup>
import signup from "~/graphql/auth/signup.gql"
import { toast } from "vue3-toastify";
import { useField, useForm } from "vee-validate"
import { useAuthStore } from "~/stores/auth";
import { jwtDecode } from "jwt-decode";


const { onLogin } = useApollo()
const { handleSubmit } = useForm();
const router = useRouter();
const authStore = useAuthStore();



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


const {
        mutate: signupMutation,
        onDone: signuponDone,
        onError: signuponError,
        loading } = authentication(signup)

const onSubmit = handleSubmit((values, { setFieldError }) => {
        const input = {
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                password: password.value,
        };
        // console.log("input", input)
        signupMutation({ input });
});
signuponDone(({ data }) => {

        router.replace('/login')
        toast.success("user succesfully signed up", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });
        // console.log("signed up")
        const decodedPayload = jwtDecode(data.signup.token)
        authStore.setToken(data.signup.token);
        authStore.setId(data.signup.id);
        authStore.user = decodedPayload['https://hasura.io/jwt/claims']?.user?.user

        authStore.setRole(data.signup.role);
        // console.log("signed up 2")


});




signuponError((error) => {
        toast.error("Something went wrong while siginup", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });
        console.log("error", error)
});


definePageMeta({
        layout: 'none'
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
                                        <button type="submit" @click.prevent="onSubmit" v-if="!loading"
                                                class="flex w-full justify-center rounded-md bg-[#E0C700] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FFE047] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Sign up
                                        </button>
                                        <div>
                                                <button type="submit" v-if="loading"
                                                        class="flex w-full  justify-center items-center  rounded-md bg-[#E0C700] hover:bg-[#FFE047] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

                                                        <div role="status">

                                                                <Icon name="eos-icons:loading"
                                                                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" />
                                                                <span class="sr-only">Loading...</span>
                                                        </div>
                                                </button>

                                        </div>
                                </div>
                        </form>

                        <p class="mt-10 text-center text-sm text-gray-500">
                                Already a member?
                                {{ ' ' }}
                                <NuxtLink to="/login"
                                        class="font-semibold leading-6 text-[#E0C700] hover:text-[#FFE047]">
                                        Login
                                </NuxtLink>
                                <!-- <a href="#" >Sign in</a> bg-[#E0C700] hover:bg-[#FFE047] -->
                        </p>
                </div>
        </div>
</template>