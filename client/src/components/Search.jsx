import React from 'react';

const Search = ({ query, change, search }) => {
  return (
    <div className="search-bar">
      <input className="form-control" type="text" value={query} onChange={change} />
      <button type="button" className="btn search" onClick={search}>
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
