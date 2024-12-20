import React, { useContext, useState } from "react";
import { SearchContext } from "../../../context/searchContext";
import { useNavigate } from "react-router-dom";

const SearchAgain = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { setSearchValue } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const updateSearch = () => {
    localStorage.setItem("ASINID", inputValue);
    setSearchValue(inputValue);
    navigate(`/overview?asin=${inputValue}`);
  };
  return (
    <div className="d-flex gap-1" id="again">
      <input
        type="search"
        className="input-group form-control inputs-search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateSearch();
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn-refresh btn-search-again" onClick={updateSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchAgain;
