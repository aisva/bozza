import React from "react";
import { shallow } from "enzyme";
import AlertDialog from "./AlertDialog";

describe("AlertDialog component", () => {
  test("AlertDialog renders without crashing", () => {
    shallow(<AlertDialog />);
  });
});
