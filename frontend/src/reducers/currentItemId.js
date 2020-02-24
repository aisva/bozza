import log from "../utils/log";
import { type } from "../actions";

const currentItemId = (state = [], action) => {
  switch (action.type) {
    case type.SET_CURRENT_ITEM_ID:
      log(
        "Current item id reducer",
        "Setting current item id to: " + action.id
      );
      return action.id;
    default:
      return state;
  }
};

export default currentItemId;
