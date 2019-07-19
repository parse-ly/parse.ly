import React from 'react';

const Search = (props) => {
  return (
    <div className="search-bar">
      <input className="form-control" type="text" />
      <button type="button" className="btn search">
        {/* OnClick/onSearch function needed */}
      </button>
      <button type="button" className="btn happy">
        {/* Happy Emoji button */}
      </button>
      <button type="button" className="btn sad">
        {/* Sad or Crying Emoji button */}
      </button>
    </div>
  );
}

export default Search;
