import React from "react";
import "./App.css";
import ListContainer from "../../containers/List";
import AddItemContainer from "../../containers/AddItem";

function App() {
  return (
    <div className="App">
      <AddItemContainer />
      <ListContainer />
    </div>
  );
}

export default App;
