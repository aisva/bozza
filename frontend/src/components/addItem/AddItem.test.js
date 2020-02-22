import React from "react";
import { shallow } from "enzyme";
import AddItem from "./AddItem";

jest.mock("react-redux", () => ({
  useDispatch: () => {}
}));

describe("AddItem component", () => {
  test("AddItem renders without crashing", () => {
    shallow(<AddItem />);
  });
});
