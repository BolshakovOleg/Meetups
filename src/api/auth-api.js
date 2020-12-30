import { http } from "@/http";

/** URL адрес API */
const API_URL = process.env.VUE_APP_API_URL;

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными пользователя
 */
export async function loginWithApi(email, password) {
  return http(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: { email, password }
  });
}

export async function logoutWithApi() {
  return http(`${API_URL}/auth/logout`, {
    method: "POST"
  });
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными зарегистрированного пользователя
 */
export async function registerWithApi(email, fullname, password) {
  return http(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: { email, fullname, password }
  });
}
