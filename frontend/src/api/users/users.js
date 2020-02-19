import api from "../../utils/api";
import log from "../../utils/log";

const apiUrl = process.env.REACT_APP_API_URL + "users/";
const endpoints = {
  signIn: "signin"
};

export const createUser = async (username, password) => {
  log(`API: ${apiUrl}`, "Creating a user");
  return await api.post(apiUrl, { username: username, password: password });
};

export const signIn = async (username, password) => {
  log(`API: ${apiUrl + endpoints.signIn}`, "Signing in a user");
  return await api.post(apiUrl + endpoints.signIn, {
    username: username,
    password: password
  });
};
