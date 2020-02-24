import { combineReducers } from "redux";
import items from "./items";
import currentItemId from "./currentItemId";
import ui from "./ui";

export default combineReducers({
  items,
  currentItemId,
  ui
});
