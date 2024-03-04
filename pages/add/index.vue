<script setup>
import { useField, useForm } from "vee-validate"
const { handleSubmit } = useForm();

const { errorMessage: titleError, value: title } = useField("title", "required", {
        initialValue: "",
});


const { errorMessage: descError, value: desc } = useField("desc", "required", {
        initialValue: "",
});

const { errorMessage: valueError, value: value } = useField("value", "required", {
        initialValue: "",
});
// connection with the back
import useMutation from "~/composables/useMutation";
import addData from "~/graphql/addData.gql"

const {
        mutate: addDataToDB,
        onDone: addDataToDBDone,
        onError: addDataToDBError,
} = useMutation(addData)






const onSubmit = handleSubmit(() => {
        console.log("form is entered successfully")
        console.log(title)
        console.log(desc)
        console.log(value)

        let input = {
                title: title,
                desc: desc,
                value: value
        }
        addDataToDB({ input })

        addDataToDBDone((response) => {
                toast.success("Recipe successfully added", {
                        transition: toast.TRANSITIONS.FLIP,
                        position: toast.POSITION.TOP_RIGHT,
                });

                navigateTo(`/recipe/${response?.data?.insert_recipes?.returning[0].id}`);
        });

        addDataToDBError((error) => {
                toast.error("Something went wrong");
                alert(error);
        });
})



</script>








<template>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" method="POST">
                        <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                </label>
                                <span class="error-style ">{{ titleError }}</span>
                                <div class="mt-2">
                                        <input id="title" name="title" type="title" autocomplete="email" required
                                                v-model="title"
                                                class="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>

                        <div>
                                <div class="flex items-center  justify-between">
                                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                                                Description
                                        </label>

                                        <!-- <div class="text-sm">
                                                                <a href="#"
                                                                class="font-semibold text-[#20c05c] hover:text-[#1a9e4e]">Forgot
                                                                password?</a>
                                                        </div> -->
                                </div>
                                <span class="error-style ">{{ descError }}</span>
                                <div class="mt-2">
                                        <input id="desc" name="desc" type="desc" v-model="desc"
                                                autocomplete="current-password" required
                                                class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>

                        <div>
                                <div class="flex items-center  justify-between">
                                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                                                Value
                                        </label>
                                </div>
                                <span class="error-style ">{{ valueError }}</span>
                                <div class="mt-2">
                                        <input id="value" name="value" type="value" v-model="value"
                                                autocomplete="current-password" required
                                                class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                        </div>

                        <div>
                                <button type="submit" @click.prevent="onSubmit"
                                        class="flex w-full  justify-center  rounded-md bg-[#20c05c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1a9e4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                        in</button>
                        </div>
                </form>

                <p class="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        {{ ' ' }}
                        <!-- <a href="#" class="font-semibold leading-6 text-[#20c05c] hover:text-[#1a9e4e]">Sign up</a> -->
                        <NuxtLink to="/sign-up"
                                class="font-semibold leading-6 text-primary-600  hover:text-primary-950">
                                Sign up
                        </NuxtLink>
                </p>
        </div>

</template>
