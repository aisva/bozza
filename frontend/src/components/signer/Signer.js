import React from "react";
import { useDispatch } from "react-redux";
import { setShowDesk } from "../../actions";
import Button from "@material-ui/core/Button";

const Signer = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    dispatch(setShowDesk(true));
  };

  return (
    <div className="Signer-root">
      <Button color="primary" onClick={signIn}>
        Sign in
      </Button>
    </div>
  );
};

export default Signer;
