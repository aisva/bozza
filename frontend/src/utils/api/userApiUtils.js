import { clearState } from "../../actions";

const tokenKey = "TOKEN_KEY";

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

const userApiUtils = {
  signOut,
  setToken,
  getToken,
  hasToken,
  removeToken
};

export default userApiUtils;
