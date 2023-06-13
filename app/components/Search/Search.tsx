'use client';

import { AiOutlineSearch } from 'react-icons/ai';
import "@/css/Search.css";

const Search = () => {
  return (
    <div className="search__container">
      <AiOutlineSearch size={20} />

      <input type="text" placeholder="Filter by Name, Region, Subregion" />
    </div>
  );
}

export default Search;
