import React from "react";
import "./App.css";
import ListContainer from "../../containers/List";
import AddItemContainer from "../../containers/AddItem";
import TestApi from "../testApi/TestApi";

function App() {
  return (
    <div className="App">
      <AddItemContainer />
      <ListContainer />
      <TestApi />
    </div>
  );
}

export default App;
