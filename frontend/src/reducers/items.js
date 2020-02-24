import log from "../utils/log";
import { type } from "../actions";

const items = (state = [], action) => {
  switch (action.type) {
    case type.ADD_ITEM:
      log("Items reducer", "Adding item with id: " + action.item.itemId);
      return [action.item, ...state];
    case type.UPDATE_ITEM:
      log("Items reducer", "Updating item with id: " + action.item.itemId);
      return state.map(item =>
        item.itemId === action.item.itemId ? action.item : item
      );
    case type.DELETE_ITEM:
      log("Items reducer", "Deleting item with id: " + action.item.itemId);
      const index = state.indexOf(action.item);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export default items;
