import React from "react";
import "./Item.css";
import IconButton from "@material-ui/core/IconButton";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentItemId,
  setShowMaster,
  setReaderScrollToTop,
  setAlertDialogMode,
  setShowAlertDialog,
  alertDialogMode
} from "../../actions";
import dateUtils from "../../utils/dateUtils";

const Item = item => {
  const dispatch = useDispatch();
  const currentItemId = useSelector(state => state.currentItemId);
  const showMaster = useSelector(state => state.ui.showMaster);

  const isTask = () => item.dueDate != null;

  const handleClick = () => {
    dispatch(setCurrentItemId(item.itemId));
    dispatch(setShowMaster(!showMaster));
    dispatch(setReaderScrollToTop(true));
  };

  const openAlertDialog = () => {
    if (!isTask()) return;
    dispatch(setCurrentItemId(item.itemId));
    dispatch(setAlertDialogMode(alertDialogMode.UPDATE));
    dispatch(setShowAlertDialog(true));
  };

  return (
    <div
      className={
        "Item-root" + (currentItemId === item.itemId ? " selected" : "")
      }
    >
      <div className="Item-icon-area">
        <IconButton
          color={isTask() ? "secondary" : "primary"}
          onClick={openAlertDialog}
        >
          {isTask() ? <EventAvailableIcon /> : <NoteIcon />}
        </IconButton>
      </div>
      <div className="Item-text-area" onClick={handleClick}>
        <div className="Item-body">{item.text}</div>
        <div className="Item-footer">
          <div className="Item-date">
            {item.updatedAt != null ? dateUtils.format(item.updatedAt) : ""}
          </div>
          <div className="Item-date accented">
            {isTask() ? `Due date: ${dateUtils.format(item.dueDate)}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
