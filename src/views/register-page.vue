<template>
  <auth-layout title="Регистрация">
    <register-form />
  </auth-layout>
</template>

<script>
import AuthLayout from '@/components/layouts/auth-layout';
import RegisterForm from '@/components/form/register-form';
export default {
  name: 'register-page',
  components: {
    AuthLayout,
    RegisterForm
  },
};
</script>

<style scoped></style>