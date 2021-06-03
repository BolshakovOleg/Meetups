import { http } from "@/http";

/** URL адрес API */
const API_URL = process.env.VUE_APP_API_URL;

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetupsWithApi() {
  return http(`${API_URL}/meetups`);
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
export async function fetchMeetupWithApi(id) {
  return http(`${API_URL}/meetups/${id}`);
}

export function deleteMeetupWithApi(meetupId) {
  return http(`${API_URL}/meetups/${meetupId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: { meetupId }
  })
}

export function participateInMeetupWithApi(meetupId) {
  return http(`${API_URL}/meetups/${meetupId}/participation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: { meetupId }
  })
}

export function cancelParticipationInMeetupWithApi(meetupId) {
  return http(`${API_URL}/meetups/${meetupId}/participation`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: { meetupId }
  })
}

