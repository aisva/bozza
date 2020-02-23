import React, { useState } from "react";
import "./Desk.css";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const items = [
  {
    itemId: "1",
    userId: "userId",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat.`,
    dueDate: "22-02-2020",
    createdAt: "20-02-2020",
    updatedAt: "20-02-2020"
  },
  {
    itemId: "2",
    userId: "userId",
    text: `Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`,
    createdAt: "20-02-2020",
    updatedAt: "20-02-2020"
  },
  {
    itemId: "3",
    userId: "userId",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad  
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquid ex ea commodi consequat. Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad. END`,
    dueDate: "22-02-2020",
    createdAt: "20-02-2020",
    updatedAt: "20-02-2020"
  },
  {
    itemId: "4",
    userId: "userId",
    text: `Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`,
    createdAt: "20-02-2020",
    updatedAt: "20-02-2020"
  },
  {
    itemId: "5",
    userId: "userId",
    text: `Lorem ipsum dolor sit amet.`,
    dueDate: "22-02-2020",
    createdAt: "20-02-2020",
    updatedAt: "20-02-2020"
  },
  {
    itemId: "6",
    userId: "userId",
    text: `Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`,
    createdAt: "20-02-2020",
    updatedAt: "20-02-2020"
  }
];

const Desk = () => {
  const [showMaster, setShowMaster] = useState(true);
  const [selectedItem, setSelectedItem] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [date, handleDateChange] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [anchorElement, setAnchorElement] = useState(null);
  return (
    <div className="Desk-root">
      <div className={"Master-root" + (showMaster ? "" : " hide")}>
        <div className={"Toolbar-root"}>
          <div className="Toolbar-button-area left-spaced">
            <input type="text" placeholder="Search..." className="Input" />
          </div>
          <div className="Toolbar-button-area">
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
              <MenuItem onClick={() => setAnchorElement(null)}>
                Sign out
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="List-root">
          {items.map(item => (
            <div
              key={item.itemId}
              className={
                "Item-root" +
                (selectedItem === parseInt(item.itemId) ? " selected" : "")
              }
            >
              <div className="Item-icon-area">
                <IconButton
                  color={item.dueDate != null ? "secondary" : "primary"}
                >
                  {item.dueDate != null ? <EventAvailableIcon /> : <NoteIcon />}
                </IconButton>
              </div>
              <div
                className="Item-text-area"
                onClick={() => {
                  setSelectedItem(parseInt(item.itemId));
                  setShowMaster(!showMaster);
                }}
              >
                <div className="Item-body">{item.text}</div>
                <div className="Item-footer">
                  <div className="Item-date">{item.updatedAt}</div>
                  <div className="Item-date accented">
                    {item.dueDate != null ? `Due date: ${item.dueDate}` : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="Fab-root">
          <Fab
            color="secondary"
            size="medium"
            onClick={() => setShowDialog(true)}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className={"Detail-root" + (!showMaster ? "" : " hide")}>
        <div className="Toolbar-root">
          <div className="Toolbar-button-area sm">
            <IconButton
              color="inherit"
              onClick={() => setShowMaster(!showMaster)}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="Toolbar-button-area">
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
            <IconButton color="inherit">
              <ShareIcon />
            </IconButton>
          </div>
        </div>
        <div className="Reader-root">
          {items[selectedItem - 1].dueDate != null ? (
            <div className="Reader-due-date">
              DUE DATE: {items[selectedItem - 1].dueDate}
            </div>
          ) : (
            ""
          )}
          <div className="Reader-body">{items[selectedItem - 1].text}</div>
          <div className="Reader-date">{items[selectedItem - 1].updatedAt}</div>
        </div>
      </div>
      <div className={"Dialog-root" + (showDialog ? "" : " hide")}>
        <div
          className="Dialog-background"
          onClick={() => setShowDialog(false)}
        ></div>
        <div className="Dialog-container">
          <div className="Dialog-header">
            <div className="Dialog-button-area">
              <IconButton color="primary" onClick={() => setShowDialog(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="Dialog-button-area">
              <Button
                color="primary"
                onClick={() =>
                  setError(
                    note == null || note.trim() === "" ? "Write a note" : ""
                  )
                }
              >
                Save
              </Button>
            </div>
          </div>
          <div className="Dialog-body">
            <TextField
              label="Note"
              value={note}
              onChange={event => setNote(event.target.value)}
              multiline
              error={error !== ""}
              helperText={error}
              fullWidth
              color="secondary"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                label="Due date"
                orientation="portrait"
                clearable
                disablePast
                value={date}
                onChange={handleDateChange}
                color="secondary"
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desk;
