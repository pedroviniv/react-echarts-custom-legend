import React from 'react';

const SearchBar = ({placeholder, onChange}) => {

  function handleKeyUpEvent(event) {
    
    console.log('[keyup] SearchBar.input.event: ', event);
    const text = event.target.value;

    if (onChange) {
      onChange(text);
    }
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      onKeyUp={handleKeyUpEvent}
    />
  )
};

export default SearchBar;