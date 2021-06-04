<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="[imageUrl ? {'--bg-image': `url(${imageUrl})`} : {}]"
    >
      <span v-if="loading">Загрузка...</span>
      <span v-else-if="isEmpty">Загрузить изображение</span>
      <span v-else>Удалить изображение</span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="form-control-file"
        @click="handleClick"
        @change="handleChange($event)"
        :disabled="loading"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '@/services/image-service';

export default {
  name: 'image-uploader',
  data() {
    return {
      loading: false,
    };
  },
  props: {
    imageId: {
      type: Number,
      default: null
    }
  },
  computed: {
    isEmpty() {
      return this.imageId === null;
    },
    imageUrl() {
      return ImageService.getImageURL(this.imageId);
    },
  },
  methods: {
    handleChange(event) {
      let file = event.target.files[0];
      console.log(file);
      this.loading = true;
      ImageService.uploadImage(file).then((res)=>{
        this.loading = false;
        this.$emit('change', res.id);
      });
    },
    handleClick(event) {
      if (this.imageId) {
        event.preventDefault();
        event.target.value = null;
        this.$emit('change', null);
      };
    },
  },
  model: {
    prop: 'imageId',
    event: 'change',
  }
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
