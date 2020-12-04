<template>
  <auth-layout title="Вход">
    <login-form />
  </auth-layout>
</template>

<script>
import AuthLayout from '@/components/layouts/auth-layout';
import LoginForm from '@/components/form/login-form';
export default {
  name: 'login-page',
  components: {
    AuthLayout,
    LoginForm
  },
};
</script>

<style scoped></style>
