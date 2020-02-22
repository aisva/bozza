import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./AddItem.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../actions";

const AddItem = () => {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!item.trim()) {
            return;
          }
          dispatch(addItem(item));
          setItem("");
        }}
      >
        <div className="AddItem-textfield-container">
          <TextField
            label="Item"
            variant="outlined"
            value={item}
            onChange={event => setItem(event.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
