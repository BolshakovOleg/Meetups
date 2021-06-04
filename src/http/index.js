export const http = function(url, options) {
  return fetch(url, {
    ...options,
    body: hasMultipartFormData(options?.headers) ? options?.body : JSON.stringify(options?.body),
    credentials: 'include'
  }).then(response => {
    if (response.ok) {
      if ( hasApplicationJson(response) ) {
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

function hasApplicationJson (response) {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
}

function hasMultipartFormData (headers) {
  if ( headers ) {
    const contentType = headers["Content-Type"];
    return contentType && contentType === "multipart/form-data";
  } else {
    return false;
  }
}
