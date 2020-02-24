import React from "react";
import { shallow } from "enzyme";
import Item from "./Item";

describe("Item component", () => {
  test("Item renders without crashing", () => {
    shallow(<Item />);
  });
});
