export const dialogMode = {
  NEW: "NEW",
  EDIT: "EDIT"
};

export const alertDialogMode = {
  DELETE: "DELETE",
  UPDATE: "UPDATE"
};

export const type = {
  ADD_ITEM: "ADD_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  SET_CURRENT_ITEM_ID: "SET_CURRENT_ITEM_ID",
  SET_SHOW_MASTER: "SET_SHOW_MASTER",
  SET_SHOW_DIALOG: "SET_SHOW_DIALOG",
  SET_DIALOG_MODE: "SET_DIALOG_MODE",
  SET_LIST_SCROLL_TO_TOP: "SET_LIST_SCROLL_TO_TOP",
  SET_READER_SCROLL_TO_TOP: "SET_READER_SCROLL_TO_TOP",
  SET_SHOW_ALERT_DIALOG: "SET_SHOW_ALERT_DIALOG",
  SET_ALERT_DIALOG_MODE: "SET_ALERT_DIALOG_MODE"
};

export const addItem = item => ({
  type: type.ADD_ITEM,
  item
});

export const updateItem = item => ({
  type: type.UPDATE_ITEM,
  item
});

export const deleteItem = item => ({
  type: type.DELETE_ITEM,
  item
});

export const setCurrentItemId = id => ({
  type: type.SET_CURRENT_ITEM_ID,
  id
});

export const setShowMaster = show => ({
  type: type.SET_SHOW_MASTER,
  show
});

export const setShowDialog = show => ({
  type: type.SET_SHOW_DIALOG,
  show
});

export const setDialogMode = mode => ({
  type: type.SET_DIALOG_MODE,
  mode
});

export const setListScrollToTop = toTop => ({
  type: type.SET_LIST_SCROLL_TO_TOP,
  toTop
});

export const setReaderScrollToTop = toTop => ({
  type: type.SET_READER_SCROLL_TO_TOP,
  toTop
});

export const setShowAlertDialog = show => ({
  type: type.SET_SHOW_ALERT_DIALOG,
  show
});

export const setAlertDialogMode = mode => ({
  type: type.SET_ALERT_DIALOG_MODE,
  mode
});
