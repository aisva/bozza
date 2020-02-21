const request = async (method, url, body = null, token = null) => {
  let headers = { "Content-Type": "application/json" };
  if (token != null) headers["Authorization"] = `Bearer ${token}`;
  let init = { method: method, headers: headers };
  if (body != null) init.body = JSON.stringify(body);
  const response = await fetch(url, init);
  if (!response.ok) {
    let error = response.statusText;
    const errorBody = await response.json();
    if (errorBody != null && errorBody.error != null) error = errorBody.error;
    throw new Error(error);
  }
  return response.json();
};

const get = async (url, body = null, token = null) =>
  request("GET", url, body, token);

const post = async (url, body = null, token = null) =>
  request("POST", url, body, token);

const http = {
  get,
  post
};

export default http;
