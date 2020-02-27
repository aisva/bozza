import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  generateAttachmentUrls,
  uploadFile
} from "./items";
import http from "../../utils/http";
import userApiUtils from "../../utils/api/userApiUtils";

jest.mock("../../utils/http");

const apiUrl = process.env.REACT_APP_API_URL + "items/";
const endpoints = {
  attachment: "attachment"
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("Items API - getItems()", () => {
  test("getItems() calls HTTP get() method once", async () => {
    expect(http.get).not.toHaveBeenCalled();
    await getItems();
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  test("getItems() passes proper parameters to HTTP get() method", async () => {
    await getItems();
    expect(http.get).toHaveBeenCalledWith(apiUrl, userApiUtils.getToken());
  });
});

describe("Items API - createItem()", () => {
  test("createItem() calls HTTP post() method once", async () => {
    expect(http.post).not.toHaveBeenCalled();
    await createItem("text");
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  test("createItem() passes proper parameters to HTTP post() method", async () => {
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
  test("updateItem() calls HTTP patch() method once", async () => {
    expect(http.patch).not.toHaveBeenCalled();
    await updateItem("1", "text");
    expect(http.patch).toHaveBeenCalledTimes(1);
  });

  test("updateItem() passes proper parameters to HTTP patch() method", async () => {
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
  test("deleteItem() calls HTTP delete() method once", async () => {
    expect(http.del).not.toHaveBeenCalled();
    await deleteItem("1");
    expect(http.del).toHaveBeenCalledTimes(1);
  });

  test("deleteItem() passes proper parameters to HTTP delete() method", async () => {
    const id = "1";
    await deleteItem(id);
    expect(http.del).toHaveBeenCalledWith(apiUrl + id, userApiUtils.getToken());
  });
});

describe("Items API - generateAttachmentUrls()", () => {
  test("generateAttachmentUrls() calls HTTP post() method once", async () => {
    expect(http.post).not.toHaveBeenCalled();
    await generateAttachmentUrls("1");
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  test("generateAttachmentUrls() passes proper parameters to HTTP post() method", async () => {
    const id = "1";
    await generateAttachmentUrls(id);
    expect(http.post).toHaveBeenCalledWith(
      apiUrl + id + "/" + endpoints.attachment,
      null,
      userApiUtils.getToken()
    );
  });
});

describe("Items API - uploadFile()", () => {
  test("uploadFile() calls HTTP put() method once", async () => {
    expect(http.put).not.toHaveBeenCalled();
    await uploadFile("url", "file");
    expect(http.put).toHaveBeenCalledTimes(1);
  });

  test("uploadFile() passes proper parameters to HTTP put() method", async () => {
    const url = "url";
    const file = "file";
    await uploadFile(url, file);
    expect(http.put).toHaveBeenCalledWith(url, file, null);
  });
});
