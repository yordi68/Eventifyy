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
                                                                <svg aria-hidden="true"
                                                                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
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