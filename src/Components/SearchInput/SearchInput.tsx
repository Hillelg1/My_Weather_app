import React from "react";
import "./searchInput.css";
type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearchSubmit: (city: string) => void;
};

const SearchInput = ({ value, onChange, onSearchSubmit }: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="searchBar">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter location"
          id="myInput"
        />

        <button
          type="submit"
          onClick={() => {
            onSearchSubmit(value);
            onChange("");
          }}
        >
          <img src="images/SearchImage.png" alt="search image" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
