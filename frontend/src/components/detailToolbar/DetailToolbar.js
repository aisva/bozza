import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../toolbar/Toolbar";
import { setShowMaster } from "../../actions";

const DetailToolbar = () => {
  const dispatch = useDispatch();
  const showMaster = useSelector(state => state.ui.showMaster);

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
          <IconButton color="inherit">
            <EditIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShareIcon />
          </IconButton>
        </Fragment>
      }
      ui={{ sm: true }}
    />
  );
};

export default DetailToolbar;
