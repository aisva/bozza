import React from "react";
import { shallow } from "enzyme";
import Signer from "./Signer";

describe("Signer component", () => {
  test("Signer renders without crashing", () => {
    shallow(<Signer />);
  });
});
