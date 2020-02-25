import React from "react";
import Desk from "../desk/Desk";
import Signer from "../signer/Signer";
import { useSelector } from "react-redux";

const App = () => {
  const showDesk = useSelector(state => state.ui.showDesk);

  return showDesk ? <Desk /> : <Signer />;
};

export default App;
