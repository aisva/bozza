import React from "react";
import { shallow } from "enzyme";
import List from "./List";

jest.mock("react-redux", () => ({
  useSelector: () => []
}));

describe("List component", () => {
  test("List renders without crashing", () => {
    shallow(<List />);
  });
});
