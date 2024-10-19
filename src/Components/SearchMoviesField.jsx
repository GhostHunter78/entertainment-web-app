import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconSearch from "../SVGs/IconSearch";

function SearchMoviesField() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search-movies-results?query=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="w-full flex items-baseline justify-between pr-4">
      <div className="w-full grid relative mt-6 cursor-pointer">
        <input
          id="searchInput"
          className="bg-BgBody py-4 pl-[70px] border-none rounded ml-26 text-[16px] text-white font-normal outfit font-weight-400 leading-20 outline-none lg:text-[20px]"
          type="text"
          placeholder="Search for movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <label className="absolute grid place-items-center top-[-2px] bottom-0">
          <button
            className="bg-transparent border-0 p-5 outline-none"
            onClick={handleSearch}
          >
            <IconSearch />
          </button>
        </label>
      </div>
      <button
        className="flex items-center justify-center rounded-md bg-genreBlue py-2 px-3 text-xs text-white hover:bg-white hover:text-indigo-800 font-bold"
        type="submit"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchMoviesField;
