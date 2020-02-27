import React, { useCallback } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { setShowFeedback, feedbackMode } from "../../actions";

const Feedback = () => {
  const mode = useSelector(state => state.ui.feedbackMode);
  const isProgress = useCallback(() => {
    return mode === feedbackMode.PROGRESS;
  }, [mode]);
  const isInfo = useCallback(() => {
    return mode === feedbackMode.INFO;
  }, [mode]);
  const showFeedback = useSelector(state => state.ui.showFeedback);
  const feedbackMessage = useSelector(state => state.ui.feedbackMessage);
  const dispatch = useDispatch();

  const hideFeedback = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(setShowFeedback(false));
  };

  const autoHide = isProgress() || isInfo() ? {} : { autoHideDuration: 5000 };

  const getAction = () => {
    if (isProgress()) return;
    return (
      <IconButton size="small" color="inherit" onClick={hideFeedback}>
        <CloseIcon fontSize="small" />
      </IconButton>
    );
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      {...autoHide}
      open={showFeedback != null ? showFeedback : false}
      onClose={hideFeedback}
      message={feedbackMessage != null ? feedbackMessage : ""}
      action={getAction()}
    />
  );
};

export default Feedback;
