<template>
  <auth-layout title="Вход">
    <login-form />
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/auth-layout";
import LoginForm from "@/components/forms/login-form";
export default {
  name: "login-page",
  components: {
    AuthLayout,
    LoginForm
  }
};
</script>

<style scoped></style>
