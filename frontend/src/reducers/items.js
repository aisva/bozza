import log from "../utils/log";
import { type } from "../actions";

const items = (state = [], action) => {
  switch (action.type) {
    case type.ADD_ITEM:
      log("Items reducer", "Adding item with id: " + action.item.itemId);
      return [action.item, ...state];
    default:
      return state;
  }
};

export default items;
