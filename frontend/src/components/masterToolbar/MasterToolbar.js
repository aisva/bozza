import React from "react";
import Toolbar from "../toolbar/Toolbar";
import MasterMenu from "../masterMenu/MasterMenu";
import SearchInput from "../searchInput/SearchInput";

const MasterToolbar = () => {
  return (
    <Toolbar
      left={<SearchInput />}
      right={<MasterMenu />}
      ui={{ leftSpaced: true }}
    />
  );
};

export default MasterToolbar;
