import React from 'react';

const Search = ({ query, change, search }) => {
  return (
    <div className="search-bar">
      <input className="form-control" type="text" placeholder="Search an Artist..." value={query} onChange={change} />
      <h2>How are you feeling?</h2>
      <button type="button" className="btn happy" onClick={search}>
        Happy
        {/* Happy Emoji button */}
      </button>
      <button type="button" className="btn sad" onClick={search}>
        Sad{/* Sad or Crying Emoji button */}
      </button>
    </div>
  );
}

export default Search;
