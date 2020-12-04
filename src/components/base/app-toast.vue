<template>
  <div
    class="toast"
    :class="classObject"
  >
    <app-icon :icon="icon" />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script>
import AppIcon from '@/components/base/app-icon';
export default {
  name: 'app-toast',
  components: { AppIcon },
  props: {
    toast: {
      type: Object,
      required: true,
      validator: function(value) {
        return value['id'] && value['type'] && value['message'];
      }
    },
  },
  computed: {
    classObject() {
      return {
        'toast_success': this.toast.type === 'success',
        'toast_error': this.toast.type === 'error',
        'toast_info': this.toast.type === 'info',
      };
    },
    icon() {
      let icon = 'check';
      switch(this.toast.type) {
        case 'error':
          icon = 'alert-circle';
          break;
        case 'success':
          icon = 'check-circle';
          break;
        default:
          break;
      }
      return icon;
    },
  },
};
</script>

<style scoped></style>
