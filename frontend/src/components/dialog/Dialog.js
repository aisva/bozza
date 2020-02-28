import React, { useState, useEffect, useCallback } from "react";
import "./Dialog.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import dateUtils from "../../utils/dateUtils";
import {
  addItem,
  updateItem,
  setCurrentItemId,
  setShowDialog,
  dialogMode,
  setListScrollToTop,
  setShowMaster,
  setFilterMode,
  filterMode
} from "../../actions";
import itemApiUtils from "../../utils/api/itemApiUtils";

const Dialog = () => {
  const mode = useSelector(state => state.ui.dialogMode);
  const item = itemApiUtils.getItemById(
    useSelector(state => state.items),
    useSelector(state => state.currentItemId)
  );
  const isEditMode = useCallback(() => {
    return mode === dialogMode.EDIT && item != null;
  }, [mode, item]);
  const [dueDate, handleDueDateChange] = useState(null);
  const resetDueDate = useCallback(() => {
    handleDueDateChange(
      isEditMode() && item.dueDate != null
        ? dateUtils.toDate(item.dueDate)
        : null
    );
  }, [handleDueDateChange, isEditMode, item]);
  useEffect(() => {
    resetDueDate();
  }, [resetDueDate]);
  const [note, setNote] = useState("");
  const resetNote = useCallback(() => {
    setNote(isEditMode() ? item.text : "");
  }, [setNote, isEditMode, item]);
  useEffect(() => {
    resetNote();
  }, [resetNote]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const showDialog = useSelector(state => state.ui.showDialog);
  useEffect(() => {
    dispatch(setShowDialog(false));
  }, [dispatch]);

  const hideDialog = () => {
    dispatch(setShowDialog(false));
    setErrors({});
  };

  const handleNoteChange = event => {
    setErrors({ note: null });
    setNote(event.target.value);
  };

  const validate = () => {
    if (note == null || note.trim() === "") {
      setErrors({ note: "Write a note" });
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!validate()) return;
    const persistedItem = !isEditMode()
      ? await itemApiUtils.createItem(dispatch, note, dueDate)
      : await itemApiUtils.updateItem(
          dispatch,
          item,
          note,
          item.dueDate != null && dueDate == null ? "" : dueDate
        );
    if (persistedItem == null) return;
    dispatch(
      !isEditMode() ? addItem(persistedItem) : updateItem(persistedItem)
    );
    if (dueDate == null) dispatch(setFilterMode(filterMode.ALL));
    dispatch(setShowMaster(true));
    dispatch(setCurrentItemId(persistedItem.itemId));
    dispatch(setListScrollToTop(true));
    hideDialog();
  };

  return (
    <div className={"Dialog-root" + (showDialog ? "" : " hide")}>
      <div className="Dialog-background" onClick={hideDialog}></div>
      <div className="Dialog-container">
        <div className="Dialog-header">
          <div className="Dialog-button-area">
            <IconButton color="primary" onClick={hideDialog}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="Dialog-button-area">
            <Button color="primary" onClick={save}>
              Save
            </Button>
          </div>
        </div>
        <div className="Dialog-body">
          <TextField
            label="Note"
            value={note}
            onChange={handleNoteChange}
            multiline
            error={errors.note != null}
            helperText={errors.note}
            fullWidth
            color="secondary"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              label="Due date"
              orientation="portrait"
              format="MM/dd/yyyy"
              clearable
              disablePast
              value={dueDate}
              onChange={handleDueDateChange}
              color="secondary"
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
