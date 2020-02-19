import { createUser, signIn } from "./users";
import api from "../../utils/api";

jest.mock("../../utils/api");

const apiUrl = process.env.REACT_APP_API_URL + "users/";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Users API - createUser()", () => {
  test("createUser() calls API's post() method once", async () => {
    expect(api.post).not.toHaveBeenCalled();
    await createUser("username", "password.1");
    expect(api.post).toHaveBeenCalledTimes(1);
  });

  test("createUser() passes proper parameters to API's post() method", async () => {
    const username = "username";
    const password = "password.1";
    await createUser(username, password);
    expect(api.post).toHaveBeenCalledWith(apiUrl, {
      username: username,
      password: password
    });
  });
});

describe("Users API - signIn()", () => {
  test("signIn() calls API's post() method once", async () => {
    expect(api.post).not.toHaveBeenCalled();
    await signIn("username", "password.1");
    expect(api.post).toHaveBeenCalledTimes(1);
  });

  test("signIn() passes proper parameters to API's post() method", async () => {
    const username = "username";
    const password = "password.1";
    await signIn(username, password);
    expect(api.post).toHaveBeenCalledWith(apiUrl + "signin", {
      username: username,
      password: password
    });
  });
});
