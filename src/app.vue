<template>
  <base-layout>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/layouts/base-layout';
export default {
  name: 'app',
  components: {
    BaseLayout
  },
}
</script>

<style scoped></style>