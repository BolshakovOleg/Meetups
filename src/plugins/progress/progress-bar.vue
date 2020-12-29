<template>
  <div
    class="progress"
    :style="{
      width: width + '%',
      opacity,
      backgroundColor
    }"
  ></div>
</template>

<script>
const UPDATE_TIME_MS = 500;

export default {
  name: "progress-bar",
  components: {},
  data() {
    return {
      width: 0,
      backgroundColor: "rgb(76, 107, 182)",
      interval: null
    };
  },
  computed: {
    opacity() {
      return this.width > 0 && this.width < 100 ? 1 : 0;
    }
  },
  methods: {
    start() {
      if (this.interval) {
        this.done();
      }
      this.interval = setInterval(() => {
        if (this.width >= 100) {
          this.done();
        } else {
          this.width++;
        }
      }, UPDATE_TIME_MS);
    },
    done() {
      this.width = 100;
      clearInterval(this.interval);
    }
  }
};
</script>

<style scoped></style>
