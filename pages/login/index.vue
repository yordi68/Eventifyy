<script setup>
import login from "~/graphql/auth/login.gql";
import { jwtDecode } from 'jwt-decode';
import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import { useAuthStore, useUserStore } from "~/stores/auth";
import getUser from "~/graphql/query/users/item.gql";
const router = useRouter()


// onError((error) => {
//         reject(error);
// });

const authStore = useAuthStore();
const userStore = useUserStore()
const { handleSubmit } = useForm();
const { onLogin } = useApollo()

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
        mutate: loginMutation,
        onDone: loginOnDone,
        onError: loginOnError,
        loading } = authentication(login)

const onSubmit = handleSubmit(() => {
        const input = {
                email: email.value,
                password: password.value,
        };
        loginMutation({ input });
});


loginOnDone(({ data }) => {
        onLogin(data.login.token, "auth")
        toast.success("user succesfully logged in", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });

        userStore.id = data.login.id
        userStore.role = data.login.user
        userStore.token = data.login.token
        userStore.setuser(data.login.id).then((result) => {
                router.replace('/')
        }).catch((error) => {
                toast.error("Something went wront try again", {
                        transition: toast.TRANSITIONS.FLIP,
                        position: toast.POSITION.TOP_RIGHT,
                })
        })

});





loginOnError((error) => {
        if (error.message.includes("Invalid")) {
                toast.error("Invalid Email or Password", {
                        transition: toast.TRANSITIONS.FLIP,
                        position: toast.POSITION.TOP_RIGHT,
                });
                return;
        }
        toast.error("Something went wrong while logging in", {
                transition: toast.TRANSITIONS.FLIP,
                position: toast.POSITION.TOP_RIGHT,
        });
        // console.log("error", error)

});

definePageMeta({
        layout: 'none'
})
</script>

<template>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-20 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in
                                to your account</h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" method="POST">
                                <div>
                                        <label for="email"
                                                class="block text-sm font-medium leading-6 text-gray-900">Email
                                                address</label>
                                        <span class="error-style ">{{ emailError }}</span>
                                        <div class="mt-2">
                                                <input id="email" name="email" type="email" autocomplete="email"
                                                        required v-model="email"
                                                        class="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                </div>

                                <div>
                                        <div class="flex items-center  justify-between">
                                                <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Password</label>

                                                <!-- <div class="text-sm">
                                                                <a href="#"
                                                                class="font-semibold text-[#20c05c] hover:text-[#1a9e4e]">Forgot
                                                                password?</a>
                                                        </div> -->
                                        </div>
                                        <span class="error-style ">{{ passwordError }}</span>
                                        <div class="mt-2">
                                                <input id="password" name="password" type="password" v-model="password"
                                                        autocomplete="current-password" required
                                                        class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                </div>

                                <div>
                                        <button type="submit" @click.prevent="onSubmit" v-if="!loading"
                                                class="flex w-full  justify-center  rounded-md bg-[#E0C700] hover:bg-[#FFE047] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                                in
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
                                Not a member?
                                {{ ' ' }}
                                <!-- <a href="#" class="font-semibold leading-6 text-[#20c05c] hover:text-[#1a9e4e]">Sign up</a> -->
                                <NuxtLink to="/sign-up"
                                        class="font-semibold leading-6 text-[#E0C700] hover:text-[#FFE047]">
                                        Sign up
                                </NuxtLink>
                        </p>
                </div>
        </div>
</template>