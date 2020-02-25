import React, { useRef, useEffect } from "react";
import "./List.css";
import { useSelector, useDispatch } from "react-redux";
import Item from "../item/Item";
import dateUtils from "../../utils/dateUtils";
import apiUtils from "../../utils/apiUtils";
import {
  setListScrollToTop,
  setCurrentItemId,
  filterMode
} from "../../actions";

const List = () => {
  const items = useSelector(state => state.items);
  const item = apiUtils.getItemById(
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
      dispatch(setCurrentItemId(getItems()[0].itemId));
      scrollToTop();
    }
  });
  const mode = useSelector(state => state.ui.filterMode);
  const pending = filterMode.PENDING === mode;
  const searchTerms = useSelector(state => state.ui.searchTerms);

  const scrollToTop = () => ref.current.scrollTo(0, 0);

  const sortByUpdatedAtDate = (a, b) => {
    const c = dateUtils.toDate(a.updatedAt);
    const d = dateUtils.toDate(b.updatedAt);
    return d - c;
  };

  const sortByDueDate = (a, b) => {
    const c = dateUtils.toDate(a.dueDate);
    const d = dateUtils.toDate(b.dueDate);
    return d - c;
  };

  const getItems = () => {
    const displayedItems = pending
      ? items.filter(item => item.dueDate != null)
      : items;
    const sortMethod = !pending ? sortByUpdatedAtDate : sortByDueDate;
    return displayedItems
      .filter(item =>
        item.text
          .toLowerCase()
          .includes(searchTerms != null ? searchTerms.trim() : "")
      )
      .sort(sortMethod);
  };

  return (
    <div className="List-root" ref={ref}>
      {getItems().map(item => (
        <Item key={item.itemId} {...item} />
      ))}
    </div>
  );
};

export default List;
