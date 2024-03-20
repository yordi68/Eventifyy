import { defineRule } from "vee-validate";

export default defineNuxtPlugin((vueApp) => {
  defineRule("required", (value, []) => {
    return !!value || value?.length || "Please fill this field";
  }),
    defineRule("number", (value) => {
      return !value || /^[0-9]+$/.test(value) || "Number only";
    }),
    defineRule("email", (value) => {
      return (
        !value ||
        /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        ) ||
        "Please Enter a valid Email"
      );
    }),
    defineRule("minLength", (value, [], context) => {
      if (value.length >= context.rule.params[0]) {
        return true;
      } else {
        return `${context.field} is must be greater than ${context.rule.params[0]}`;
      }
    });
  defineRule("password", (value) => {
    return (
      !value ||
      value.length >= 6 ||
      "Password Must be greater than 6 characters"
    );
  }),
    defineRule("confirmed", (value, [other]) => {
      return (
        !value ||
        value === other ||
        "The two passwords you entered are not the same"
      );
    });
});
