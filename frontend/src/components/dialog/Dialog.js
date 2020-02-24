import React, { useState, useEffect } from "react";
import "./Dialog.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setCurrentItemId, setShowDialog } from "../../actions";
import Item from "../../models/Item";

const Dialog = () => {
  const [date, handleDateChange] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const showDialog = useSelector(state => state.ui.showDialog);
  useEffect(() => {
    dispatch(setShowDialog(false));
  }, [dispatch]);

  return (
    <div className={"Dialog-root" + (showDialog ? "" : " hide")}>
      <div
        className="Dialog-background"
        onClick={() => dispatch(setShowDialog(false))}
      ></div>
      <div className="Dialog-container">
        <div className="Dialog-header">
          <div className="Dialog-button-area">
            <IconButton
              color="primary"
              onClick={() => dispatch(setShowDialog(false))}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="Dialog-button-area">
            <Button
              color="primary"
              onClick={() => {
                setError(
                  note == null || note.trim() === "" ? "Write a note" : ""
                );
                dispatch(
                  addItem(
                    new Item(
                      "7",
                      "userId",
                      "Text new",
                      "20-02-2020",
                      "20-02-2020"
                    )
                  )
                );
                dispatch(setCurrentItemId("7"));
                dispatch(setShowDialog(false));
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="Dialog-body">
          <TextField
            label="Note"
            value={note}
            onChange={event => setNote(event.target.value)}
            multiline
            error={error !== ""}
            helperText={error}
            fullWidth
            color="secondary"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              label="Due date"
              orientation="portrait"
              clearable
              disablePast
              value={date}
              onChange={handleDateChange}
              color="secondary"
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
