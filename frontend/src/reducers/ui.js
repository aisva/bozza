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
    case type.SET_DIALOG_MODE:
      log("UI reducer", "Setting dialog mode to: " + action.mode);
      return { ...state, dialogMode: action.mode };
    case type.SET_LIST_SCROLL_TO_TOP:
      log(
        "UI reducer",
        "Setting list scroll to top: " + action.toTop.toString()
      );
      return { ...state, listScrollToTop: action.toTop };
    case type.SET_READER_SCROLL_TO_TOP:
      log(
        "UI reducer",
        "Setting reader scroll to top: " + action.toTop.toString()
      );
      return { ...state, readerScrollToTop: action.toTop };
    case type.SET_SHOW_ALERT_DIALOG:
      log(
        "UI reducer",
        "Setting show alert dialog to: " + action.show.toString()
      );
      return { ...state, showAlertDialog: action.show };
    case type.SET_ALERT_DIALOG_MODE:
      log("UI reducer", "Setting alert dialog mode to: " + action.mode);
      return { ...state, alertDialogMode: action.mode };
    case type.SET_FILTER_MODE:
      log("UI reducer", "Setting filter mode to: " + action.mode);
      return { ...state, filterMode: action.mode };
    case type.SET_SEARCH_TERMS:
      log("UI reducer", "Setting search terms to: " + action.terms);
      return { ...state, searchTerms: action.terms };
    case type.SET_SHOW_DESK:
      log("UI reducer", "Setting show desk to: " + action.show.toString());
      return { ...state, showDesk: action.show };
    default:
      return state;
  }
};

export default ui;
