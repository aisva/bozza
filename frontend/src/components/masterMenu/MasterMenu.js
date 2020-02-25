import React, { useState, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterMode,
  filterMode,
  setListScrollToTop,
  setSearchTerms,
  setAlertDialogMode,
  setShowAlertDialog,
  alertDialogMode
} from "../../actions";

const MasterMenu = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const mode = useSelector(state => state.ui.filterMode);
  const pending = filterMode.PENDING === mode;
  const dispatch = useDispatch();

  const showFilteredNotes = () => {
    dispatch(setFilterMode(!pending ? filterMode.PENDING : filterMode.ALL));
    dispatch(setSearchTerms(""));
    dispatch(setListScrollToTop(true));
    closeMenu();
  };

  const openAlertDialog = () => {
    closeMenu();
    dispatch(setAlertDialogMode(alertDialogMode.SIGN_OUT));
    dispatch(setShowAlertDialog(true));
  };

  const openMenu = event => setAnchorElement(event.currentTarget);

  const closeMenu = () => {
    setAnchorElement(null);
  };

  return (
    <Fragment>
      <IconButton color="inherit" onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeMenu}
      >
        <MenuItem onClick={showFilteredNotes}>
          {pending ? "All notes" : "Pending notes"}
        </MenuItem>
        <MenuItem onClick={openAlertDialog}>Sign out</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MasterMenu;
