<template>
  <div
    class="input-group"
    :class="{ 'input-group_icon': hasIcon, 'input-group_icon-left': hasIcon }"
  >
    <slot name="left-icon"></slot>
    <textarea
      v-if="multiline"
      class="form-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    ></textarea>
    <input
      v-else
      class="form-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'app-input',

  inheritAttrs: false,

  props: {
    value: {},
    multiline: Boolean,
  },

  data() {
    return {
      hasIcon: false,
    };
  },

  mounted() {
    this.updateHasIcon();
  },

  updated() {
    this.updateHasIcon();
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: ($event) => this.$emit('input', $event.target.value),
        change: ($event) => this.$emit('change', $event.target.value),
      };
    },
  },

  methods: {
    updateHasIcon() {
      this.hasIcon = !!this.$slots['left-icon'];
    },
  },
};
</script>

<style scoped></style>
