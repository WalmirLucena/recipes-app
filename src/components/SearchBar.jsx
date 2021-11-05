import React, { useState } from 'react';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <form action="">
      <label htmlFor="search-bar">
        <input
          id="search-bar"
          type="text"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
          data-testid="search-input"
        />
      </label>
    </form>
  );
}
