import { createUser, signIn } from "./users";
import http from "../../utils/http";

jest.mock("../../utils/http");

const apiUrl = process.env.REACT_APP_API_URL + "users/";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Users API - createUser()", () => {
  test("createUser() calls HTTP post() method once", async () => {
    expect(http.post).not.toHaveBeenCalled();
    await createUser("username", "password.1");
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  test("createUser() passes proper parameters to HTTP post() method", async () => {
    const username = "username";
    const password = "password.1";
    await createUser(username, password);
    expect(http.post).toHaveBeenCalledWith(apiUrl, {
      username: username,
      password: password
    });
  });
});

describe("Users API - signIn()", () => {
  test("signIn() calls HTTP post() method once", async () => {
    expect(http.post).not.toHaveBeenCalled();
    await signIn("username", "password.1");
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  test("signIn() passes proper parameters to HTTP post() method", async () => {
    const username = "username";
    const password = "password.1";
    await signIn(username, password);
    expect(http.post).toHaveBeenCalledWith(apiUrl + "signin", {
      username: username,
      password: password
    });
  });
});
