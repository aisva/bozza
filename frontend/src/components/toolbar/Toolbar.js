import React from "react";
import "./Toolbar.css";

const Toolbar = ({ left, right, ui }) => {
  const leftSpaced =
    ui.leftSpaced != null && ui.leftSpaced ? " left-spaced" : "";
  const sm = ui.sm != null && ui.sm ? " sm" : "";

  return (
    <div className={"Toolbar-root"}>
      <div className={"Toolbar-button-area" + leftSpaced + sm}>{left}</div>
      <div className="Toolbar-button-area">{right}</div>
    </div>
  );
};

export default Toolbar;
