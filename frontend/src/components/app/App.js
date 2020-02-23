import React from "react";
import "./App.css";
import TestApi from "../testApi/TestApi";
import List from "../list/List";
import AddItem from "../addItem/AddItem";
import Desk from "../desk/Desk";

function App() {
  const test = false;

  if (test) {
    return (
      <div className="App">
        <AddItem />
        <List />
        <TestApi />
      </div>
    );
  } else {
    return <Desk />;
  }
}

export default App;
