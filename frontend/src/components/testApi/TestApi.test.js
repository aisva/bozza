import React from "react";
import { shallow } from "enzyme";
import TestApi from "./TestApi";

describe("TestApi component", () => {
  test("TestApi renders without crashing", () => {
    shallow(<TestApi />);
  });
});
