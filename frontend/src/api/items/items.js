import http from "../../utils/http";
import log from "../../utils/log";
import apiUtils from "../../utils/apiUtils";

const apiUrl = process.env.REACT_APP_API_URL + "items/";

export const getItems = async () => {
  log(`API: ${apiUrl}`, "Getting items");
  return await http.get(apiUrl, apiUtils.getToken());
};

export const createItem = async (text, dueDate = null) => {
  log(`API: ${apiUrl}`, "Creating an item");
  const body =
    dueDate != null ? { text: text, dueDate: dueDate } : { text: text };
  return await http.post(apiUrl, body, apiUtils.getToken());
};

export const updateItem = async (id, text, dueDate = null) => {
  log(`API: ${apiUrl}`, "Updating an item");
  const body =
    dueDate != null ? { text: text, dueDate: dueDate } : { text: text };
  return await http.patch(apiUrl + id, body, apiUtils.getToken());
};
