import React from "react";
import { shallow } from "enzyme";
import Desk from "./Desk";

describe("Desk component", () => {
  test("Desk renders without crashing", () => {
    shallow(<Desk />);
  });
});
