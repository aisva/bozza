import Item from "../models/Item";
import {
  clearState,
  setShowFeedback,
  setFeedbackMessage,
  setFeedbackMode,
  feedbackMode
} from "../actions";
import { getItems as apiGetItems } from "../api/items/items";
import log from "./log";
import { addItem } from "../actions";

const tokenKey = "TOKEN_KEY";
const entity = "Api utils";
const unauthorizedStatus = "401";
const forbiddenStatus = "403";

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

const getItems = async dispatch => {
  showProgress(true, dispatch, "Loading notes...");
  try {
    const response = await apiGetItems();
    for (let item of response.items) {
      dispatch(
        addItem(
          new Item(
            item.itemId,
            item.userId,
            item.text,
            item.createdAt,
            item.updatedAt,
            item.dueDate,
            item.downloadUrl
          )
        )
      );
    }
    showProgress(false, dispatch);
  } catch (error) {
    handleError(error, "Unable to load notes", dispatch);
  }
};

const getItemById = (items, id) => {
  const filteredItems = items.filter(item => item.itemId === id);
  return filteredItems.length > 0 ? filteredItems[0] : null;
};

const handleError = (error, message, dispatch) => {
  log(entity, `Error getting items: ${error.message}`, true);
  showProgress(false, dispatch);
  if (
    error.message.startsWith(unauthorizedStatus) ||
    error.message.startsWith(forbiddenStatus)
  ) {
    signOut(dispatch);
    return;
  }
  dispatch(setShowFeedback(true));
  dispatch(setFeedbackMode(feedbackMode.ERROR));
  dispatch(setFeedbackMessage(message));
};

const showProgress = (show, dispatch, message = "") => {
  dispatch(setShowFeedback(show));
  if (!show) return;
  dispatch(setFeedbackMode(feedbackMode.PROGRESS));
  dispatch(setFeedbackMessage(message));
};

const createItem = (text, dueDate) => {
  return new Item(
    Math.floor(Math.random() * 10000).toString(),
    "userId",
    text,
    new Date().toISOString(),
    new Date().toISOString(),
    dueDate != null ? dueDate.toISOString() : null
  );
};

const updateItem = (item, text, dueDate) => {
  return new Item(
    item.itemId,
    item.userId,
    text,
    item.createdAt,
    new Date().toISOString(),
    dueDate != null ? dueDate.toISOString() : null
  );
};

const signOut = dispatch => {
  dispatch(clearState());
  removeToken();
};

const apiUtils = {
  setToken,
  getToken,
  hasToken,
  removeToken,
  getItems,
  getItemById,
  createItem,
  updateItem,
  signOut
};

export default apiUtils;
