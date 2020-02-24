import React from "react";
import "./FloatingActionButton.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { setShowDialog, setDialogMode, dialogMode } from "../../actions";

const FloatingActionButton = () => {
  const dispatch = useDispatch();

  const openDialog = () => {
    dispatch(setDialogMode(dialogMode.NEW));
    dispatch(setShowDialog(true));
  };

  return (
    <div className="Fab-root">
      <Fab color="secondary" size="medium" onClick={openDialog}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default FloatingActionButton;
