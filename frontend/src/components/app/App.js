import React from "react";
import "./App.css";
import TestApi from "../testApi/TestApi";
import List from "../list/List";
import AddItem from "../addItem/AddItem";

function App() {
  return (
    <div className="App">
      <AddItem />
      <List />
      <TestApi />
    </div>
  );
}

export default App;
