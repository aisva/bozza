import apiUtils from "./apiUtils";
import feedbackUtils from "../feedbackUtils";
import {
  getItems as apiGetItems,
  createItem as apiCreateItem,
  updateItem as apiUpdateItem,
  deleteItem as apiDeleteItem,
  generateAttachmentUrls as apiGenerateAttachmentUrls,
  uploadFile
} from "../../api/items/items";
import log from "../log";
import { addItem } from "../../actions";
import Item from "../../models/Item";

const entity = "Item api utils";

const getItems = async dispatch => {
  feedbackUtils.showProgress(true, dispatch, "Loading notes...");
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
    feedbackUtils.showProgress(false, dispatch);
    if (response.items.length === 0)
      feedbackUtils.showError(dispatch, "You have not written any note yet");
  } catch (error) {
    log(entity, `Error getting items: ${error.message}`, true);
    apiUtils.handleError(error, "Unable to load notes", dispatch);
  }
};

const getItemById = (items, id) => {
  const filteredItems = items.filter(item => item.itemId === id);
  return filteredItems.length > 0 ? filteredItems[0] : null;
};

const createItem = async (dispatch, text, dueDate = null) => {
  feedbackUtils.showProgress(true, dispatch, "Saving note...");
  try {
    const response = await apiCreateItem(text, dueDate);
    const item = response.item;
    feedbackUtils.showProgress(false, dispatch);
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
    apiUtils.handleError(error, "Unable to save note", dispatch);
  }
};

const updateItem = async (dispatch, item, text, dueDate) => {
  feedbackUtils.showProgress(true, dispatch, "Saving note...");
  try {
    await apiUpdateItem(item.itemId, text, dueDate);
    feedbackUtils.showProgress(false, dispatch);
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
    apiUtils.handleError(error, "Unable to save note", dispatch);
  }
};

const deleteItem = async (dispatch, item) => {
  feedbackUtils.showProgress(true, dispatch, "Deleting note...");
  try {
    await apiDeleteItem(item.itemId);
    feedbackUtils.showProgress(false, dispatch);
    return true;
  } catch (error) {
    log(
      entity,
      `Error deleting item with id: ${item.itemId}. Error message: ${error.message}`,
      true
    );
    apiUtils.handleError(error, "Unable to delete note", dispatch);
    return false;
  }
};

const shareItem = async (dispatch, item) => {
  feedbackUtils.showProgress(true, dispatch, "Sharing note...");
  try {
    const urls = await apiGenerateAttachmentUrls(item.itemId);
    await uploadFile(urls.uploadUrl, item.text);
    feedbackUtils.showProgress(false, dispatch);
    return urls.downloadUrl;
  } catch (error) {
    log(
      entity,
      `Error sharing item with id: ${item.itemId}. Error message: ${error.message}`,
      true
    );
    apiUtils.handleError(error, "Unable to share note", dispatch, false);
  }
};

const itemApiUtils = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  shareItem
};

export default itemApiUtils;
