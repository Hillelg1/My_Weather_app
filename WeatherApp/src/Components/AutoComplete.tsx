import React, { useState, useEffect } from "react";

type AutoCompleteProps = {
  onSelect: (city: string) => void;

  onSearchSubmit: (e: React.FormEvent) => void;
};

const AutoComplete = ({
  onSelect,

  onSearchSubmit,
}: AutoCompleteProps) => {
  const [input, selectInput] = useState("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const ApiKey = "252aa837ea838f7f53967dd2f02308ec";
  const fetchCities = async (myInput: string) => {
    try {
      const get = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${myInput}&limit=5&appid=${ApiKey}`
      );
      const data = await get.json();
      return data.map((city: any) => `${city.name}, ${city.country}`);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  useEffect(() => {
    if (input.length > 0) {
      const fetchSuggestions = async () => {
        const city = await fetchCities(input);
        setSuggestion(city);
      };
      fetchSuggestions();
    } else {
      setSuggestion([]);
    }
  }, [input]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectInput(event.target.value);
  };
  const handleSelect = (suggestion: string) => {
    selectInput(suggestion);
    setSuggestion([]);
    onSelect(suggestion);
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter location"
          className="searchBar"
        />
        <button
          type="submit"
          className="search"
          onClick={() => handleSelect(input)}
        >
          Search
        </button>
      </form>
      {suggestion.length > 0 && (
        <ul>
          {suggestion.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="suggestion"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
