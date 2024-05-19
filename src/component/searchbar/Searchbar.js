import React from 'react';
import './searchbar.css'; // Import the CSS file for styling

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search blogs..."
        className="search-input"
      />
      {/* <button onClick={onSearch} className="search-button">Search</button> */}
    </div>
  );
};

export default SearchBar;
