<template>
  <div class="toasts">
    <app-toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
  </div>
</template>

<script>
import AppToast from "@/components/base/app-toast";
const DELAY = 5000;

export default {
  name: "toaster",
  components: { AppToast },
  data() {
    return {
      toasts: [],
      id: 0
    };
  },
  methods: {
    info(message) {
      this.create(message, "info");
    },
    error(message) {
      this.create(message, "error");
    },
    success(message) {
      this.create(message, "success");
    },
    create(message, type) {
      this.toasts.push({
        id: ++this.id,
        type: type,
        message: message
      });
      setTimeout(this.remove, DELAY, this.id);
    },
    remove(id) {
      this.toasts = this.toasts.filter(toast => {
        return toast.id !== id;
      });
    }
  }
};
</script>

<style scoped></style>
