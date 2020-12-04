<template>
  <div class="wrapper bg-grey">
    <the-header />
    <main class="main">
      <slot></slot>
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/single-instance/the-header';
import TheFooter from '@/components/single-instance/the-footer';
export default {
  name: 'base-layout',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped></style>
