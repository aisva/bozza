import React from "react";
import "./SearchInput.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerms } from "../../actions";

const SearchInput = () => {
  const searchTerms = useSelector(state => state.ui.searchTerms);
  const dispatch = useDispatch();

  const handleChange = event => dispatch(setSearchTerms(event.target.value));

  return (
    <input
      type="text"
      placeholder="Search..."
      className="SearchInput"
      value={searchTerms != null ? searchTerms : ""}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
