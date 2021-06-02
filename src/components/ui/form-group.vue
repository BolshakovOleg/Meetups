<template>
  <div class="form-group" :class="{ 'form-group_inline': inline }">
    <label v-if="label" class="form-label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  name: "form-group",

  props: {
    inline: {
      type: Boolean,
      default: false
    },
    label: String
  }
};
</script>

<style scoped></style>
