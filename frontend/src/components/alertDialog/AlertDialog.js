import React, { useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowAlertDialog,
  deleteItem,
  alertDialogMode,
  updateItem,
  setCurrentItemId,
  setListScrollToTop
} from "../../actions";
import stateUtils from "../../utils/stateUtils";
import apiUtils from "../../utils/apiUtils";

export default function AlertDialog() {
  const mode = useSelector(state => state.ui.alertDialogMode);
  const isDeleteMode = useCallback(() => {
    return mode === alertDialogMode.DELETE;
  }, [mode]);
  const item = stateUtils.getItemById(
    useSelector(state => state.items),
    useSelector(state => state.currentItemId)
  );
  const dispatch = useDispatch();
  const showAlertDialog = useSelector(state => state.ui.showAlertDialog);
  useEffect(() => {
    dispatch(setShowAlertDialog(false));
  }, [dispatch]);
  const messages = {
    title: isDeleteMode()
      ? "Do you want to delete this note?"
      : "Do you want to mark this pending note as resolved?",
    text: isDeleteMode()
      ? 'Press the "Delete" button below to remove this note permanently.'
      : 'Press the "Resolve" button below to remove the due date from this pending note.',
    button: isDeleteMode() ? "Delete" : "Resolve"
  };

  const hideDialog = () => {
    dispatch(setShowAlertDialog(false));
  };

  const mainAction = () => {
    if (isDeleteMode()) {
      dispatch(deleteItem(item));
    } else {
      const persistedItem = apiUtils.updateItem(item, item.text, null);
      dispatch(updateItem(persistedItem));
      dispatch(setCurrentItemId(persistedItem.itemId));
      dispatch(setListScrollToTop(true));
    }
    hideDialog();
  };

  return (
    <div>
      <Dialog
        open={showAlertDialog != null ? showAlertDialog : false}
        onClose={hideDialog}
      >
        <DialogTitle>{messages.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{messages.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={mainAction} color="primary" autoFocus>
            {messages.button}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
