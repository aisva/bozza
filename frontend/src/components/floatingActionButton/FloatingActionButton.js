import React from "react";
import "./FloatingActionButton.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { setShowDialog } from "../../actions";

const FloatingActionButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="Fab-root">
      <Fab
        color="secondary"
        size="medium"
        onClick={() => dispatch(setShowDialog(true))}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default FloatingActionButton;
