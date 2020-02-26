import React, { useEffect } from "react";
import Desk from "../desk/Desk";
import Signer from "../signer/Signer";
import { useSelector, useDispatch } from "react-redux";
import userApiUtils from "../../utils/api/userApiUtils";
import { setShowDesk } from "../../actions";

const App = () => {
  const showDesk = useSelector(state => state.ui.showDesk);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowDesk(userApiUtils.hasToken()));
  }, [dispatch]);

  return showDesk ? <Desk /> : <Signer />;
};

export default App;
