const noContentStatus = 204;

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
    throw new Error(response.status + ": " + error);
  }
  return response.status === noContentStatus ? null : response.json();
};

const get = async (url, token = null) => request("GET", url, null, token);

const post = async (url, body = null, token = null) =>
  request("POST", url, body, token);

const patch = async (url, body = null, token = null) =>
  request("PATCH", url, body, token);

const http = {
  get,
  post,
  patch
};

export default http;
