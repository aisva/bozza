import http from "../../utils/http";
import log from "../../utils/log";
import userApiUtils from "../../utils/api/userApiUtils";

const apiUrl = process.env.REACT_APP_API_URL + "items/";
const endpoints = {
  attachment: "attachment"
};

export const getItems = async () => {
  log(`API: ${apiUrl}`, "Getting items");
  return await http.get(apiUrl, userApiUtils.getToken());
};

export const createItem = async (text, dueDate = null) => {
  log(`API: ${apiUrl}`, "Creating an item");
  const body =
    dueDate != null ? { text: text, dueDate: dueDate } : { text: text };
  return await http.post(apiUrl, body, userApiUtils.getToken());
};

export const updateItem = async (id, text, dueDate = null) => {
  const url = apiUrl + id;
  log(`API: ${url}`, `Updating item with id: ${id}`);
  const body =
    dueDate != null ? { text: text, dueDate: dueDate } : { text: text };
  await http.patch(url, body, userApiUtils.getToken());
};

export const deleteItem = async id => {
  const url = apiUrl + id;
  log(`API: ${url}`, `Deleting item with id: ${id}`);
  await http.del(url, userApiUtils.getToken());
};

export const generateAttachmentUrls = async id => {
  const url = apiUrl + id + "/" + endpoints.attachment;
  log(`API: ${url}`, `Generating attachment URLs for item with id: ${id}`);
  return await http.post(url, null, userApiUtils.getToken());
};

export const uploadFile = async (url, file) => {
  log(`API: ${url}`, `Uploading file`);
  await http.put(url, file, null);
};
