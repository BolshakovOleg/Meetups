export const http = function (url, options) {
  return fetch(url, {...options});
};