import { http } from "@/http";

/** URL адрес API */
const API_URL = process.env.VUE_APP_API_URL;

export async function uploadImageWithApi(data) {
  return http(`${API_URL}/images/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "accept": "application/json"
    },
    body: data
  });
}