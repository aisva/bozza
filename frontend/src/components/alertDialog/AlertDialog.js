import React, { useEffect } from "react";
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
  setListScrollToTop,
  setShowMaster
} from "../../actions";
import stateUtils from "../../utils/stateUtils";
import apiUtils from "../../utils/apiUtils";

export default function AlertDialog() {
  const mode = useSelector(state => state.ui.alertDialogMode);
  const item = stateUtils.getItemById(
    useSelector(state => state.items),
    useSelector(state => state.currentItemId)
  );
  const dispatch = useDispatch();
  const showAlertDialog = useSelector(state => state.ui.showAlertDialog);
  useEffect(() => {
    dispatch(setShowAlertDialog(false));
  }, [dispatch]);

  const hideDialog = () => {
    dispatch(setShowAlertDialog(false));
  };

  const getMessages = () => {
    switch (mode) {
      case alertDialogMode.DELETE:
        return {
          title: "Do you want to delete this note?",
          text: 'Press the "Delete" button to remove this note permanently.',
          button: "Delete"
        };
      case alertDialogMode.UPDATE:
        return {
          title: "Do you want to mark this pending note as resolved?",
          text:
            'Press the "Resolve" button to remove the due date from this pending note.',
          button: "Resolve"
        };
      case alertDialogMode.SIGN_OUT:
        return {
          title: "Do you want to sign out?",
          text: 'Press the "Sign out" button to confirm.',
          button: "Sign out"
        };
      default:
        return { title: "", text: "", button: "" };
    }
  };

  const mainAction = () => {
    switch (mode) {
      case alertDialogMode.DELETE:
        dispatch(deleteItem(item));
        dispatch(setShowMaster(true));
        hideDialog();
        break;
      case alertDialogMode.UPDATE:
        const persistedItem = apiUtils.updateItem(item, item.text, null);
        dispatch(updateItem(persistedItem));
        dispatch(setCurrentItemId(persistedItem.itemId));
        dispatch(setListScrollToTop(true));
        hideDialog();
        break;
      case alertDialogMode.SIGN_OUT:
        hideDialog();
        apiUtils.signOut(dispatch);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog
        open={showAlertDialog != null ? showAlertDialog : false}
        onClose={hideDialog}
      >
        <DialogTitle>{getMessages().title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{getMessages().text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={mainAction} color="primary" autoFocus>
            {getMessages().button}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
