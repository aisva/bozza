import { getItems, createItem, updateItem, deleteItem } from "./items";
import http from "../../utils/http";
import userApiUtils from "../../utils/api/userApiUtils";

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
    expect(http.get).toHaveBeenCalledWith(apiUrl, userApiUtils.getToken());
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
      userApiUtils.getToken()
    );
  });
});

describe("Items API - updateItem()", () => {
  test("updateItem() calls API's patch() method once", async () => {
    expect(http.patch).not.toHaveBeenCalled();
    await updateItem("1", "text");
    expect(http.patch).toHaveBeenCalledTimes(1);
  });

  test("updateItem() passes proper parameters to API's patch() method", async () => {
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
      userApiUtils.getToken()
    );
  });
});

describe("Items API - deleteItem()", () => {
  test("deleteItem() calls API's delete() method once", async () => {
    expect(http.del).not.toHaveBeenCalled();
    await deleteItem("1");
    expect(http.del).toHaveBeenCalledTimes(1);
  });

  test("deleteItem() passes proper parameters to API's delete() method", async () => {
    const id = "1";
    await deleteItem(id);
    expect(http.del).toHaveBeenCalledWith(apiUrl + id, userApiUtils.getToken());
  });
});
