import React from "react";
import { shallow } from "enzyme";
import Feedback from "./Feedback";

describe("Feedback component", () => {
  test("Feedback renders without crashing", () => {
    shallow(<Feedback />);
  });
});
