import React from "react";
import { shallow } from "enzyme";
import DetailToolbar from "./DetailToolbar";

describe("DetailToolbar component", () => {
  test("DetailToolbar renders without crashing", () => {
    shallow(<DetailToolbar />);
  });
});
