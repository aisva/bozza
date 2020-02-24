import React from "react";
import "./Item.css";
import IconButton from "@material-ui/core/IconButton";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentItemId, setShowMaster } from "../../actions";

const Item = item => {
  const dispatch = useDispatch();
  const currentItemId = useSelector(state => state.currentItemId);
  const showMaster = useSelector(state => state.ui.showMaster);

  return (
    <div
      className={
        "Item-root" + (currentItemId === item.itemId ? " selected" : "")
      }
    >
      <div className="Item-icon-area">
        <IconButton color={item.dueDate != null ? "secondary" : "primary"}>
          {item.dueDate != null ? <EventAvailableIcon /> : <NoteIcon />}
        </IconButton>
      </div>
      <div
        className="Item-text-area"
        onClick={() => {
          dispatch(setCurrentItemId(item.itemId));
          dispatch(setShowMaster(!showMaster));
        }}
      >
        <div className="Item-body">{item.text}</div>
        <div className="Item-footer">
          <div className="Item-date">{item.updatedAt}</div>
          <div className="Item-date accented">
            {item.dueDate != null ? `Due date: ${item.dueDate}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
