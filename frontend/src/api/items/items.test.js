import { getItems } from "./items";
import http from "../../utils/http";

jest.mock("../../utils/http");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Users API - getItems()", () => {
  test("getItems() calls API's get() method once", async () => {
    expect(http.get).not.toHaveBeenCalled();
    await getItems();
    expect(http.get).toHaveBeenCalledTimes(1);
  });
});
