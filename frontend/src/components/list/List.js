import React from "react";
import "./List.css";
import { useSelector } from "react-redux";
import Item from "../item/Item";

const List = () => {
  const items = useSelector(state => state.items);
  return (
    <div className="List-root">
      {items.map(item => (
        <Item key={item.itemId} {...item} />
      ))}
    </div>
  );
};

export default List;
