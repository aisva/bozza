import React, { useRef, useEffect } from "react";
import "./List.css";
import { useSelector, useDispatch } from "react-redux";
import Item from "../item/Item";
import dateUtils from "../../utils/dateUtils";
import stateUtils from "../../utils/stateUtils";
import { setListScrollToTop, setCurrentItemId } from "../../actions";

const List = () => {
  const items = useSelector(state => state.items);
  const item = stateUtils.getItemById(
    items,
    useSelector(state => state.currentItemId)
  );
  const listScrollToTop = useSelector(state => state.ui.listScrollToTop);
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    if (listScrollToTop) {
      scrollToTop();
      dispatch(setListScrollToTop(false));
    }
    if (items.indexOf(item) === -1 && items.length > 0) {
      dispatch(setCurrentItemId(items[0].itemId));
      scrollToTop();
    }
  });

  const scrollToTop = () => ref.current.scrollTo(0, 0);

  const sort = (a, b) => {
    const c = dateUtils.toDate(a.updatedAt);
    const d = dateUtils.toDate(b.updatedAt);
    return d - c;
  };

  return (
    <div className="List-root" ref={ref}>
      {items.sort(sort).map(item => (
        <Item key={item.itemId} {...item} />
      ))}
    </div>
  );
};

export default List;
