import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./AddItem.css";

const AddItem = ({ addItem }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          addItem(input.value);
          input.value = "";
        }}
      >
        <div className="AddItem-textField-container">
          <TextField
            className="AddItem-textField"
            label="Item"
            variant="outlined"
            inputRef={node => (input = node)}
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
