import "./suggestionList.css";

type SuggestionListProps = {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
};

const SuggestionList = ({ suggestions, onSelect }: SuggestionListProps) => {
  return (
    <nav>
      <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              onSelect(suggestion);
            }}
            className="suggestion"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SuggestionList;
