import { clearState } from "../../actions";
import {
  createUser as apiCreateUser,
  signIn as apiSignIn
} from "../../api/users/users";
import feedbackUtils from "../feedbackUtils";
import log from "../log";
import apiUtils from "./apiUtils";

const tokenKey = "TOKEN_KEY";
const usernameLength = { max: 15, min: 3 };
const usernamePattern = /^[a-z0-9]+$/i;
const passwordLength = { max: 15, min: 8 };
const entity = "User API utils";

const createUser = async (dispatch, username, password) => {
  feedbackUtils.showProgress(true, dispatch, "Signing up...");
  try {
    const response = await apiCreateUser(username, password);
    setToken(response.token);
    feedbackUtils.showProgress(false, dispatch);
    return true;
  } catch (error) {
    log(
      entity,
      `Error creating user with username: ${username}. Error message: ${error.message}`,
      true
    );
    apiUtils.handleError(
      error,
      "Unable to sign up: " + apiUtils.getErrorMessage(error),
      dispatch
    );
    return false;
  }
};

const signIn = async (dispatch, username, password) => {
  feedbackUtils.showProgress(true, dispatch, "Signing in...");
  try {
    const response = await apiSignIn(username, password);
    setToken(response.token);
    feedbackUtils.showProgress(false, dispatch);
    return true;
  } catch (error) {
    log(
      entity,
      `Error signing in user with username: ${username}. Error message: ${error.message}`,
      true
    );
    apiUtils.handleError(
      error,
      "Unable to sign in: " + apiUtils.getErrorMessage(error),
      dispatch,
      false
    );
    return false;
  }
};

const signOut = dispatch => {
  dispatch(clearState());
  removeToken();
};

const setToken = token => localStorage.setItem(tokenKey, token);

const getToken = () => {
  try {
    return localStorage.getItem(tokenKey);
  } catch (error) {
    return null;
  }
};

const hasToken = () => getToken() != null;

const removeToken = () => localStorage.removeItem(tokenKey);

const validate = (username, password, setErrors) => {
  if (getUsernameError(username) == null && getPasswordError(password) == null)
    return true;
  setErrors({
    username: getUsernameError(username),
    password: getPasswordError(password)
  });
  return false;
};

const getUsernameError = username => {
  if (username == null || username.trim() === "") return "Write a username";
  let trimmedUsername = username.trim();
  if (trimmedUsername.length > usernameLength.max)
    return `Maximum length: ${usernameLength.max} characters`;
  if (trimmedUsername.length < usernameLength.min)
    return `Minimum length: ${usernameLength.min} characters`;
  if (!usernamePattern.test(trimmedUsername))
    return "Write only letters and numbers";
  return null;
};

const getPasswordError = password => {
  if (password == null || password.trim() === "") return "Write a password";
  let trimmedPassword = password.trim();
  if (trimmedPassword.length > passwordLength.max)
    return `Maximum length: ${passwordLength.max} characters`;
  if (trimmedPassword.length < passwordLength.min)
    return `Minimum length: ${passwordLength.min} characters`;
  return null;
};

const resetUsernameError = (errors, setErrors) => {
  setErrors({
    username: null,
    password: errors.password != null ? errors.password : null
  });
};

const resetPasswordError = (errors, setErrors) => {
  setErrors({
    username: errors.username != null ? errors.username : null,
    password: null
  });
};

const userApiUtils = {
  createUser,
  signIn,
  signOut,
  setToken,
  getToken,
  hasToken,
  removeToken,
  validate,
  resetUsernameError,
  resetPasswordError
};

export default userApiUtils;
