import React from "react";
import { shallow } from "enzyme";
import FloatingActionButton from "./FloatingActionButton";

describe("FloatingActionButton component", () => {
  test("FloatingActionButton renders without crashing", () => {
    shallow(<FloatingActionButton />);
  });
});
