<template>
  <div class="content-tabs">
    <div class="content-tabs__nav">
      <router-link
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.to"
        class="content-tabs__tab"
        active-class="content-tabs__tab_active"
        >{{ tab.text }}</router-link
      >
    </div>
    <div class="content-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "content-tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: function(value) {
        return value.length > 0;
      }
    }
  }
};
</script>

<style scoped></style>
