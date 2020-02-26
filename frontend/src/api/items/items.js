import http from "../../utils/http";
import log from "../../utils/log";
import userApiUtils from "../../utils/api/userApiUtils";

const apiUrl = process.env.REACT_APP_API_URL + "items/";

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
  log(`API: ${apiUrl + id}`, `Updating item with id: ${id}`);
  const body =
    dueDate != null ? { text: text, dueDate: dueDate } : { text: text };
  return await http.patch(apiUrl + id, body, userApiUtils.getToken());
};

export const deleteItem = async id => {
  log(`API: ${apiUrl + id}`, `Deleting item with id: ${id}`);
  return await http.del(apiUrl + id, userApiUtils.getToken());
};
