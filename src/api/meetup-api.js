import { http } from "@/http";

/** URL адрес API */
const API_URL = process.env.VUE_APP_API_URL;

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetupsWithApi() {
  return http(`${API_URL}/meetups`).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(res => {
        throw new Error(res.message);
      });
    }
  });
}

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Получает данные митапа с API
 * @param {integer} id - id митапа
 * @return {Promise}
 */
export async function fetchMeetup(id) {
  return fetch(`${API_URL}/meetups/${id}`).then(res => res.json());
}
