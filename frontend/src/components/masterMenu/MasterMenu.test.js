import React from "react";
import { shallow } from "enzyme";
import MasterMenu from "./MasterMenu";

describe("MasterMenu component", () => {
  test("MasterMenu renders without crashing", () => {
    shallow(<MasterMenu />);
  });
});
