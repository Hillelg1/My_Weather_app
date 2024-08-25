import React from "react";

type SearchProps = {
  location: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
};

function Search({ location, onSearchChange, onSearchSubmit }: SearchProps) {
  return (
    <form onSubmit={onSearchSubmit}>
      <input
        type="text"
        value={location}
        onChange={onSearchChange}
        placeholder="Enter location"
        className="searchBar"
      />
      <button type="submit" className="searchBar">
        Search
      </button>
    </form>
  );
}

export default Search;
