import React from "react";
import { useDispatch } from "react-redux";
import { setShowDesk } from "../../actions";
import Button from "@material-ui/core/Button";
import userApiUtils from "../../utils/api/userApiUtils";

const Signer = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    userApiUtils.setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZjE5ZWU1NC02ZmQ3LTRlNTEtOGI0Zi1lN2Y3NzQ5N2YxZTIiLCJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiaWF0IjoxNTgyNjI2Mzk0LCJleHAiOjE1ODMyMzExOTR9.StiJiO6dnC5Dp-2TsXESSJ5jWexrtrSH1zL8cxv6Xuk"
    );
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
