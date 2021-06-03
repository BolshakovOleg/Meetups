export const http = function(url, options) {
  return fetch(url, {
    ...options,
    body: JSON.stringify(options?.body)
  }).then(response => {
    if (response.ok) {
      if ( contentTypeIsApplicationJson(response) ) {
        return response.json();
      } else {
        return response.text();
      }
    } else {
      return response.json().then(res => {
        throw new Error(res.message);
      });
    }
  });
};

function contentTypeIsApplicationJson (response) {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
}
