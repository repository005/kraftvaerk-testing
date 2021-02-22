import React from 'react';
import './Search.scss';

const Search = () => {
  return (
    <div className="search__wrapper">
      <label>
        <input placeholder="Type anything..." type="text" />
      </label>
    </div>
  );
};

export default Search;
