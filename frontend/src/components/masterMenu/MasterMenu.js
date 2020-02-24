import React, { useState, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MasterMenu = () => {
  const [anchorElement, setAnchorElement] = useState(null);

  return (
    <Fragment>
      <IconButton
        color="inherit"
        onClick={event => setAnchorElement(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
      >
        <MenuItem onClick={() => setAnchorElement(null)}>
          Only pending tasks
        </MenuItem>
        <MenuItem onClick={() => setAnchorElement(null)}>Edit</MenuItem>
        <MenuItem onClick={() => setAnchorElement(null)}>Sign out</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MasterMenu;
