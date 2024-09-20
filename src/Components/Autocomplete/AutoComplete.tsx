import { useState, useEffect } from "react";
import SearchInput from "../SearchInput/SearchInput";
import SuggestionList from "../SuggestionList/SuggestionList";

type AutocompleteProps = {
  onSelect: (city: string) => void;
  onSearchSubmit: (city: string) => void;
};

const Autocomplete = ({ onSelect, onSearchSubmit }: AutocompleteProps) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[] | null>([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchCities = async (input: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(
        data.map(
          (city: any) =>
            `${city.name}, ${city.state ? city.state : city.country}`
        )
      );
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (input) fetchCities(input);
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  const handleSelect = (suggestion: string) => {
    setInput(suggestion);
    onSelect(suggestion);
    setInput("");
    setSuggestions(null);
  };

  return (
    <div className="autocomplete-container">
      <SearchInput
        value={input}
        onChange={setInput}
        onSearchSubmit={onSearchSubmit}
      />
      {!(suggestions == null) && (
        <div className="suggestion-container">
          <SuggestionList suggestions={suggestions} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
