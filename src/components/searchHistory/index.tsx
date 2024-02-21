import React from 'react';
import './style.css'
const SearchHistory: React.FC<{ history: string[], onSearch: (searchText: string) => void }> = ({ history, onSearch }) => {
  return (
    <div>
      <h3>Search History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSearch(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
