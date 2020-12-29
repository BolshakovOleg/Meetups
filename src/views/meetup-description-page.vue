<template>
  <p class="meetup-description">{{ description }}</p>
</template>

<script>
export default {
  name: "meetup-description-page",

  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  computed: {
    description() {
      return this.meetup?.description || "Описание отсутсвует.";
    }
  }
};
</script>

<style scoped></style>
