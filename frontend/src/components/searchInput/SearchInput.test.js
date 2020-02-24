import React from "react";
import { shallow } from "enzyme";
import SearchInput from "./SearchInput";

describe("SearchInput component", () => {
  test("SearchInput renders without crashing", () => {
    shallow(<SearchInput />);
  });
});
