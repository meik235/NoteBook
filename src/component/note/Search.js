import React from "react";

const Search = (props) => {
  const onSearchHandler = (event) => {
    props.onSearch(event.target.value);
  };

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={onSearchHandler}
      />
    </div>
  );
};

export default Search;
