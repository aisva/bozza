import React from "react";
import { shallow } from "enzyme";
import Dialog from "./Dialog";

describe("Dialog component", () => {
  test("Dialog renders without crashing", () => {
    shallow(<Dialog />);
  });
});
