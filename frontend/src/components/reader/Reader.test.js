import React from "react";
import { shallow } from "enzyme";
import Reader from "./Reader";

jest.mock("react-redux", () => ({
  useSelector: () => []
}));

describe("Reader component", () => {
  test("Reader renders without crashing", () => {
    shallow(<Reader />);
  });
});
