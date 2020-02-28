import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShowDesk } from "../../actions";
import Button from "@material-ui/core/Button";
import userApiUtils from "../../utils/api/userApiUtils";
import TextField from "@material-ui/core/TextField";
import "./Signer.css";
import logo from "../../assets/logo.svg";

const Signer = () => {
  const dispatch = useDispatch();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const sign = async () => {
    if (!userApiUtils.validate(username, password, setErrors)) return;
    resetErrors();
    const signed = isSignUpMode
      ? await userApiUtils.createUser(dispatch, username, password)
      : await userApiUtils.signIn(dispatch, username, password);
    if (!signed) return;
    dispatch(setShowDesk(true));
  };

  const changeMode = () => {
    setIsSignUpMode(!isSignUpMode);
    reset();
  };

  const handleUsernameChange = event => {
    userApiUtils.resetUsernameError(errors, setErrors);
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    userApiUtils.resetPasswordError(errors, setErrors);
    setPassword(event.target.value);
  };

  const resetErrors = () => {
    setErrors({});
  };

  const reset = () => {
    setUsername("");
    setPassword("");
    resetErrors();
  };

  return (
    <div className="Signer-root">
      <div className="Signer-card">
        <div className="Signer-logo">
          <img src={logo} alt="Bozza" />
        </div>
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          error={errors.username != null}
          helperText={errors.username}
          color="secondary"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          error={errors.password != null}
          helperText={errors.password}
          color="secondary"
        />
        <div className="Signer-button-area">
          <Button color="primary" onClick={changeMode}>
            {isSignUpMode ? "Sign in" : "Sign up"}
          </Button>
          <Button variant="contained" color="primary" onClick={sign}>
            {isSignUpMode ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signer;
