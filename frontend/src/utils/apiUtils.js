import Item from "../models/Item";

const createItem = (text, dueDate) => {
  return new Item(
    Math.floor(Math.random() * 10000).toString(),
    "userId",
    text,
    new Date().toISOString(),
    new Date().toISOString(),
    dueDate != null ? dueDate.toISOString() : null
  );
};

const updateItem = (item, text, dueDate) => {
  return new Item(
    item.itemId,
    item.userId,
    text,
    item.createdAt,
    new Date().toISOString(),
    dueDate != null ? dueDate.toISOString() : null
  );
};

const apiUtils = {
  createItem,
  updateItem
};

export default apiUtils;
