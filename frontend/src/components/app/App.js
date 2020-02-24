import React from "react";
import "./App.css";
import TestApi from "../testApi/TestApi";
import Desk from "../desk/Desk";

function App() {
  const test = false;

  if (test) {
    return (
      <div className="App">
        <TestApi />
      </div>
    );
  } else {
    return <Desk />;
  }
}

export default App;
