import React from "react";
import Button from "@material-ui/core/Button";
import { createUser, signIn } from "../../api/users/users";
import log from "../../utils/log";
import "./TestApi.css";

const entity = "TestApi component";

const TestApi = () => {
  return (
    <div className="TestApi-container">
      <h3>USER MANAGEMENT</h3>
      <Button
        color="secondary"
        onClick={async () => {
          try {
            const response = await createUser("username", "password.1");
            log(
              entity,
              `Token obtained after creating a user: ${response.token}`
            );
          } catch (error) {
            log(entity, `Error creating a user: ${error.message}`, true);
          }
        }}
      >
        Create user
      </Button>
      <Button
        color="primary"
        onClick={async () => {
          try {
            const response = await signIn("username", "password.1");
            log(
              entity,
              `Token obtained after signin in a user: ${response.token}`
            );
          } catch (error) {
            log(entity, `Error signing in a user: ${error.message}`, true);
          }
        }}
      >
        Sign in
      </Button>
    </div>
  );
};

export default TestApi;
