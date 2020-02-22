import React from "react";
import { shallow } from "enzyme";
import List from "./List";

jest.mock("react-redux", () => ({
  useDispatch: () => {},
  useSelector: () => [{ id: 1, completed: false, text: "text" }]
}));

describe("List component", () => {
  test("List renders without crashing", () => {
    shallow(<List />);
  });
});
