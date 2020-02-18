import React from "react";
import { shallow } from "enzyme";
import List from "./List";

describe("List component", () => {
  test("List renders without crashing", () => {
    const props = {
      items: [{ id: 1, completed: false, text: "text" }],
      toggleItem: () => {}
    };
    shallow(<List {...props} />);
  });
});
