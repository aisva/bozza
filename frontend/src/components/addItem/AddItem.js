import React from "react";

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
        <input ref={node => (input = node)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
