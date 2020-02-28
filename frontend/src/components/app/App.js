import React, { useEffect, Fragment } from "react";
import Desk from "../desk/Desk";
import Signer from "../signer/Signer";
import Feedback from "../feedback/Feedback";
import { useSelector, useDispatch } from "react-redux";
import userApiUtils from "../../utils/api/userApiUtils";
import { setShowDesk } from "../../actions";

const App = () => {
  const showDesk = useSelector(state => state.ui.showDesk);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowDesk(userApiUtils.hasToken()));
  }, [dispatch]);

  return (
    <Fragment>
      {showDesk ? <Desk /> : <Signer />}
      <Feedback />
    </Fragment>
  );
};

export default App;
