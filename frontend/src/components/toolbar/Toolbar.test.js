import React from "react";
import { shallow } from "enzyme";
import Toolbar from "./Toolbar";

describe("Toolbar component", () => {
  test("Toolbar renders without crashing", () => {
    const props = { left: {}, right: {}, ui: {} };
    shallow(<Toolbar {...props} />);
  });
});
