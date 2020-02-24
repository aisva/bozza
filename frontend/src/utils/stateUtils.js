import { addItem } from "../actions";
import Item from "../models/Item";

const items = [
  {
    itemId: "6",
    userId: "userId",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat.`,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    itemId: "5",
    userId: "userId",
    text: `Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    itemId: "4",
    userId: "userId",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad. END`,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    itemId: "3",
    userId: "userId",
    text: `Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    itemId: "2",
    userId: "userId",
    text: `Lorem ipsum dolor sit amet.`,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    itemId: "1",
    userId: "userId",
    text: `Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const addItems = (items, dispatch) => {
  for (let item of items.reverse()) {
    dispatch(
      addItem(
        new Item(
          item.itemId,
          item.userId,
          item.text,
          item.createdAt,
          item.updatedAt,
          item.dueDate,
          item.downloadUrl
        )
      )
    );
  }
};

const getItemById = (items, id) => {
  const filteredItems = items.filter(item => item.itemId === id);
  return filteredItems.length > 0 ? filteredItems[0] : null;
};

const stateUtils = {
  items,
  addItems,
  getItemById
};

export default stateUtils;
