import feedbackUtils from "../feedbackUtils";
import userApiUtils from "./userApiUtils";

const unauthorizedStatus = "401";
const forbiddenStatus = "403";

const handleError = (error, message, dispatch) => {
  feedbackUtils.showProgress(false, dispatch);
  if (
    error.message.startsWith(unauthorizedStatus) ||
    error.message.startsWith(forbiddenStatus)
  ) {
    userApiUtils.signOut(dispatch);
    return;
  }
  feedbackUtils.showError(dispatch, message);
};

const apiUtils = {
  handleError
};

export default apiUtils;
