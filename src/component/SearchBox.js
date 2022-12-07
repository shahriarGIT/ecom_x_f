import React, { useState } from "react";

import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search/name/${search}`);
      setSearch("");
    }
  };

  return (
    <form className="row-flex seachComponent">
      <input
        className="searchBox"
        type="text"
        id="search"
        value={search}
        placeholder="Serach Product"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={submitHandler}>
        <FcSearch />
      </button>
    </form>
  );
};

export default SearchBox;
