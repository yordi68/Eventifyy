import { defineRule } from "vee-validate";

export default defineNuxtPlugin((vueApp) => {
  defineRule("onerequired", (value, [], ctx) => {
    return !!value || value?.length || "At least one selection required";
  }),
    defineRule("required", (value, [], ctx) => {
      return !!value || value?.length || "Field Required";
    }),
    defineRule("boolReq", (value, [], ctx) => {
      return typeof value == "boolean" || "Field Required";
    });

  defineRule("array_object_required", (value, [], ctx) => {
    return value?.length || "Field Required";
  }),
    defineRule("yes_or_no", (value, [], ctx) => {
      return value?.length || "Field Required";
    }),
    defineRule("number", (value) => {
      return !value || /^[0-9]+$/.test(value) || "Number only";
    }),
    defineRule("numberFromZero", (value, [], ctx) => {
      return /^(?:0|[1-9]\d*)$/.test(value) || "Number only";
    });
  defineRule("numrange", (value) => {
    return !value || /^[0-9-]+$/.test(value) || "Number only";
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

  defineRule("ethio_phone", (value) => {
    return !value || /^(7|9)\d{8}$/.test(value) || "Not valid phone number";
  }),
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
