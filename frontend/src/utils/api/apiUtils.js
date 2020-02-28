import feedbackUtils from "../feedbackUtils";
import userApiUtils from "./userApiUtils";

const unauthorizedStatus = "401";
const forbiddenStatus = "403";

const handleError = (error, message, dispatch, signOut = true) => {
  feedbackUtils.showProgress(false, dispatch);
  if (
    signOut &&
    (error.message.startsWith(unauthorizedStatus) ||
      error.message.startsWith(forbiddenStatus))
  ) {
    userApiUtils.signOut(dispatch);
    return;
  }
  feedbackUtils.showError(dispatch, message);
};

const getErrorMessage = error => {
  return error.message.substring(
    error.message.indexOf(":") + 1,
    error.message.length
  );
};

const apiUtils = {
  handleError,
  getErrorMessage
};

export default apiUtils;
