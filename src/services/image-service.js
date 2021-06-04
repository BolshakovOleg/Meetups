import { uploadImageWithApi } from "@/api"

const API_URL = process.env.VUE_APP_API_URL;

export const ImageService = {
  async uploadImage(file) {
    if ( file instanceof Blob ) {
      let formData = new FormData();
      //formData.append("file", file.name);
      //formData.append("type", file.type);
      formData.append("image", file, file.name);
      return uploadImageWithApi(formData);
    } else {
      return null;
    }
  },
  getImageURL(id) {
    return id !== null ? `${API_URL}/images/${id}` : null;
  },
};
