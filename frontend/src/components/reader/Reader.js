import React, { useEffect, useRef } from "react";
import "./Reader.css";
import { useSelector, useDispatch } from "react-redux";
import stateUtils from "../../utils/stateUtils";
import dateUtils from "../../utils/dateUtils";
import { setReaderScrollToTop } from "../../actions";

const Reader = () => {
  const items = useSelector(state => state.items);
  const currentItemId = useSelector(state => state.currentItemId);
  const item = stateUtils.getItemById(items, currentItemId);
  const readerScrollToTop = useSelector(state => state.ui.readerScrollToTop);
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    if (readerScrollToTop) {
      ref.current.scrollTo(0, 0);
      dispatch(setReaderScrollToTop(false));
    }
  });

  return (
    <div className="Reader-root" ref={ref}>
      {item != null && item.dueDate != null ? (
        <div className="Reader-due-date">
          DUE DATE: {dateUtils.format(item.dueDate)}
        </div>
      ) : (
        ""
      )}
      <div className="Reader-body">{item != null && item.text}</div>
      <div className="Reader-date">
        {item != null && dateUtils.format(item.updatedAt)}
      </div>
    </div>
  );
};

export default Reader;