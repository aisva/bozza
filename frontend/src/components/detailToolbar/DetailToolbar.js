import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../toolbar/Toolbar";
import {
  setShowMaster,
  setDialogMode,
  setShowDialog,
  dialogMode,
  setShowAlertDialog,
  setAlertDialogMode,
  alertDialogMode
} from "../../actions";
import itemApiUtils from "../../utils/api/itemApiUtils";
import feedbackUtils from "../../utils/feedbackUtils";

const DetailToolbar = () => {
  const dispatch = useDispatch();
  const showMaster = useSelector(state => state.ui.showMaster);
  const item = itemApiUtils.getItemById(
    useSelector(state => state.items),
    useSelector(state => state.currentItemId)
  );
  const disabled = item == null;

  const openDialog = () => {
    dispatch(setDialogMode(dialogMode.EDIT));
    dispatch(setShowDialog(true));
  };

  const openAlertDialog = () => {
    dispatch(setAlertDialogMode(alertDialogMode.DELETE));
    dispatch(setShowAlertDialog(true));
  };

  const share = async () => {
    const downloadUrl = await itemApiUtils.shareItem(dispatch, item);
    if (downloadUrl == null) return;
    const message = (
      <div>
        Use the following link to share your note:{" "}
        <a
          className="Feedback-link"
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {downloadUrl}
        </a>
      </div>
    );
    feedbackUtils.showInfo(dispatch, message);
  };

  return (
    <Toolbar
      left={
        <IconButton
          color="inherit"
          onClick={() => dispatch(setShowMaster(!showMaster))}
        >
          <ArrowBackIcon />
        </IconButton>
      }
      right={
        <Fragment>
          <IconButton color="inherit" disabled={disabled} onClick={openDialog}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="inherit"
            disabled={disabled}
            onClick={openAlertDialog}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton color="inherit" disabled={disabled} onClick={share}>
            <ShareIcon />
          </IconButton>
        </Fragment>
      }
      ui={{ sm: true }}
    />
  );
};

export default DetailToolbar;
