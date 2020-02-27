import {
  setShowFeedback,
  setFeedbackMessage,
  setFeedbackMode,
  feedbackMode
} from "../actions";

const showProgress = (show, dispatch, message = "") => {
  dispatch(setShowFeedback(show));
  if (!show) return;
  dispatch(setFeedbackMode(feedbackMode.PROGRESS));
  dispatch(setFeedbackMessage(message));
};

const showError = (dispatch, message) => {
  dispatch(setShowFeedback(true));
  dispatch(setFeedbackMode(feedbackMode.ERROR));
  dispatch(setFeedbackMessage(message));
};

const showInfo = (dispatch, message) => {
  dispatch(setShowFeedback(true));
  dispatch(setFeedbackMode(feedbackMode.INFO));
  dispatch(setFeedbackMessage(message));
};

const feedbackUtils = {
  showError,
  showProgress,
  showInfo
};

export default feedbackUtils;
