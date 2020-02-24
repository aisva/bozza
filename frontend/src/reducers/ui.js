import log from "../utils/log";
import { type } from "../actions";

const ui = (state = [], action) => {
  switch (action.type) {
    case type.SET_SHOW_MASTER:
      log("UI reducer", "Setting show master to: " + action.show.toString());
      return { ...state, showMaster: action.show };
    case type.SET_SHOW_DIALOG:
      log("UI reducer", "Setting show dialog to: " + action.show.toString());
      return { ...state, showDialog: action.show };
    default:
      return state;
  }
};

export default ui;
