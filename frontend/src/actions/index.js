let nextItemId = 0;

export const addItem = text => ({
  type: "ADD_ITEM",
  id: nextItemId++,
  text
});

export const toggleItem = id => ({
  type: "TOGGLE_ITEM",
  id
});
