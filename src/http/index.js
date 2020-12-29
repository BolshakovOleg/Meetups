export const http = function(url, options) {
  return fetch(url, {
    ...options,
    body: JSON.stringify(options?.body)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(res => {
        throw new Error(res.message);
      });
    }
  });
};
