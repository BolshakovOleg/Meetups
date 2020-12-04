<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "auth-layout",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
