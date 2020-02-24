import React from "react";
import "./Reader.css";
import { useSelector } from "react-redux";
import stateUtils from "../../utils/stateUtils";

const Reader = () => {
  const items = useSelector(state => state.items);
  const currentItemId = useSelector(state => state.currentItemId);

  return (
    <div className="Reader-root">
      {stateUtils.getItemById(items, currentItemId) != null &&
      stateUtils.getItemById(items, currentItemId).dueDate != null ? (
        <div className="Reader-due-date">
          DUE DATE:{" "}
          {stateUtils.getItemById(items, currentItemId) != null &&
            stateUtils.getItemById(items, currentItemId).dueDate}
        </div>
      ) : (
        ""
      )}
      <div className="Reader-body">
        {stateUtils.getItemById(items, currentItemId) != null &&
          stateUtils.getItemById(items, currentItemId).text}
      </div>
      <div className="Reader-date">
        {stateUtils.getItemById(items, currentItemId) != null &&
          stateUtils.getItemById(items, currentItemId).updatedAt}
      </div>
    </div>
  );
};

export default Reader;
