import { combineReducers } from "redux";
import items from "./items";
import currentItemId from "./currentItemId";
import ui from "./ui";
import { type } from "../actions";

const appReducer = combineReducers({
  items,
  currentItemId,
  ui
});

const rootReducer = (state, action) => {
  if (action.type === type.CLEAR_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
