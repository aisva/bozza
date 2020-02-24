import React from "react";
import { shallow } from "enzyme";
import MasterToolbar from "./MasterToolbar";

describe("MasterToolbar component", () => {
  test("MasterToolbar renders without crashing", () => {
    shallow(<MasterToolbar />);
  });
});
