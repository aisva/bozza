export const type = {
  ADD_ITEM: "ADD_ITEM",
  SET_CURRENT_ITEM_ID: "SET_CURRENT_ITEM_ID",
  SET_SHOW_MASTER: "SHOW_MASTER",
  SET_SHOW_DIALOG: "SHOW_DIALOG"
};

export const addItem = item => ({
  type: type.ADD_ITEM,
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
