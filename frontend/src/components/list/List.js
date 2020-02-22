import React from "react";
import Item from "../item/Item";
import { useSelector, useDispatch } from "react-redux";
import { toggleItem } from "../../actions";

const List = () => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  return (
    <ul>
      {items.map(item => (
        <Item
          key={item.id}
          {...item}
          onClick={() => dispatch(toggleItem(item.id))}
        />
      ))}
    </ul>
  );
};

export default List;
