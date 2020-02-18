import React from "react";
import { shallow } from "enzyme";
import AddItem from "./AddItem";

describe("AddItem component", () => {
  test("AddItem renders without crashing", () => {
    shallow(<AddItem />);
  });
});
