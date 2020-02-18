import Logger from "../utils/logger";

const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      Logger("Items reducer", "Adding an item");
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "TOGGLE_ITEM":
      Logger("Items reducer", "Toggling an item", true);
      return state.map(item =>
        item.id === action.id ? { ...item, completed: !item.completed } : item
      );
    default:
      return state;
  }
};

export default items;
