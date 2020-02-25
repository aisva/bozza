import Item from "../models/Item";
import {
  clearState,
  setShowFeedback,
  setFeedbackMessage,
  setFeedbackMode,
  feedbackMode
} from "../actions";
import {
  getItems as apiGetItems,
  createItem as apiCreateItem,
  updateItem as apiUpdateItem
} from "../api/items/items";
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
    if (response.items.length === 0)
      showError(dispatch, "You have not written any note yet");
  } catch (error) {
    log(entity, `Error getting items: ${error.message}`, true);
    handleError(error, "Unable to load notes", dispatch);
  }
};

const getItemById = (items, id) => {
  const filteredItems = items.filter(item => item.itemId === id);
  return filteredItems.length > 0 ? filteredItems[0] : null;
};

const createItem = async (dispatch, text, dueDate = null) => {
  showProgress(true, dispatch, "Saving note...");
  try {
    const response = await apiCreateItem(text, dueDate);
    const item = response.item;
    showProgress(false, dispatch);
    return new Item(
      item.itemId,
      item.userId,
      item.text,
      item.createdAt,
      item.updatedAt,
      item.dueDate
    );
  } catch (error) {
    log(entity, `Error creating an item: ${error.message}`, true);
    handleError(error, "Unable to save note", dispatch);
  }
};

const updateItem = async (dispatch, item, text, dueDate) => {
  showProgress(true, dispatch, "Saving note...");
  try {
    await apiUpdateItem(item.itemId, text, dueDate);
    showProgress(false, dispatch);
    return new Item(
      item.itemId,
      item.userId,
      text,
      item.createdAt,
      new Date().toISOString(),
      dueDate != null && dueDate === ""
        ? null
        : dueDate != null
        ? dueDate.toISOString()
        : null
    );
  } catch (error) {
    log(
      entity,
      `Error updating item with id: ${item.itemId}. Error message: ${error.message}`,
      true
    );
    handleError(error, "Unable to save note", dispatch);
  }
};

const handleError = (error, message, dispatch) => {
  showProgress(false, dispatch);
  if (
    error.message.startsWith(unauthorizedStatus) ||
    error.message.startsWith(forbiddenStatus)
  ) {
    signOut(dispatch);
    return;
  }
  showError(dispatch, message);
};

const showProgress = (show, dispatch, message = "") => {
  dispatch(setShowFeedback(show));
  if (!show) return;
  dispatch(setFeedbackMode(feedbackMode.PROGRESS));
  dispatch(setFeedbackMessage(message));
};

const showError = (dispatch, message) => {
  dispatch(setShowFeedback(true));
  dispatch(setFeedbackMode(feedbackMode.ERROR));
  dispatch(setFeedbackMessage(message));
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
