"use client";

import "@/css/Search.css";
import { AiOutlineSearch } from "react-icons/ai";

const Search: React.FC<{
  filterCountries: (keyword: string) => void;
}> = ({ filterCountries }) => {
  return (
    <div className="search__container">
      <AiOutlineSearch size={20} />

      <input
        type="text"
        placeholder="Filter by Name, Region, Subregion"
        onChange={(e) => filterCountries(e.target.value)}
      />
    </div>
  );
};

export default Search;
