import React, { useEffect } from "react";
import Desk from "../desk/Desk";
import Signer from "../signer/Signer";
import { useSelector, useDispatch } from "react-redux";
import apiUtils from "../../utils/apiUtils";
import { setShowDesk } from "../../actions";

const App = () => {
  const showDesk = useSelector(state => state.ui.showDesk);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowDesk(apiUtils.hasToken()));
  }, [dispatch]);

  return showDesk ? <Desk /> : <Signer />;
};

export default App;
