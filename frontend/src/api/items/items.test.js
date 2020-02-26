import { getItems, createItem, updateItem } from "./items";
import http from "../../utils/http";
import apiUtils from "../../utils/apiUtils";

jest.mock("../../utils/http");

const apiUrl = process.env.REACT_APP_API_URL + "items/";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Items API - getItems()", () => {
  test("getItems() calls API's get() method once", async () => {
    expect(http.get).not.toHaveBeenCalled();
    await getItems();
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  test("getItems() passes proper parameters to API's post() method", async () => {
    await getItems();
    expect(http.get).toHaveBeenCalledWith(apiUrl, apiUtils.getToken());
  });
});

describe("Items API - createItem()", () => {
  test("createItem() calls API's post() method once", async () => {
    expect(http.post).not.toHaveBeenCalled();
    await createItem("text");
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  test("createItem() passes proper parameters to API's post() method", async () => {
    const text = "text";
    const dueDate = "dueDate";
    await createItem(text, dueDate);
    expect(http.post).toHaveBeenCalledWith(
      apiUrl,
      {
        text: text,
        dueDate: dueDate
      },
      apiUtils.getToken()
    );
  });
});

describe("Items API - updateItem()", () => {
  test("updateItem() calls API's post() method once", async () => {
    expect(http.patch).not.toHaveBeenCalled();
    await updateItem("1", "text");
    expect(http.patch).toHaveBeenCalledTimes(1);
  });

  test("updateItem() passes proper parameters to API's post() method", async () => {
    const id = "1";
    const text = "text";
    const dueDate = "dueDate";
    await updateItem(id, text, dueDate);
    expect(http.patch).toHaveBeenCalledWith(
      apiUrl + id,
      {
        text: text,
        dueDate: dueDate
      },
      apiUtils.getToken()
    );
  });
});
