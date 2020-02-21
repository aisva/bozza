import http from "../../utils/http";
import log from "../../utils/log";

const apiUrl = process.env.REACT_APP_API_URL + "users/";
const endpoints = {
  signIn: "signin"
};

export const createUser = async (username, password) => {
  log(`API: ${apiUrl}`, "Creating a user");
  return await http.post(apiUrl, { username: username, password: password });
};

export const signIn = async (username, password) => {
  log(`API: ${apiUrl + endpoints.signIn}`, "Signing in a user");
  return await http.post(apiUrl + endpoints.signIn, {
    username: username,
    password: password
  });
};
