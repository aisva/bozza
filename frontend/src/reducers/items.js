import log from "../utils/log";

const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      log("Items reducer", "Adding an item");
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "TOGGLE_ITEM":
      log("Items reducer", "Toggling an item", true);
      return state.map(item =>
        item.id === action.id ? { ...item, completed: !item.completed } : item
      );
    default:
      return state;
  }
};

export default items;
