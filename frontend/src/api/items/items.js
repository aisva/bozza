import http from "../../utils/http";
import log from "../../utils/log";
import apiUtils from "../../utils/apiUtils";

const apiUrl = process.env.REACT_APP_API_URL + "items/";

export const getItems = async () => {
  log(`API: ${apiUrl}`, "Getting items");
  return await http.get(apiUrl, apiUtils.getToken());
};
