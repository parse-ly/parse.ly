import React from 'react';

const Search = ({
  query, change, search, positivePolarity, negativePolarity,
}) => (
  <div className="search-bar">
    <input className="form-control" type="text" placeholder="Search an Artist..." value={query} onChange={change} />
    <h2>How are you feeling?</h2>
    <button type="button" className="btn happy" onClick={() => { positivePolarity(); search(query); }}>
        Happy
      {/* Happy Emoji button */}
    </button>
    <button type="button" className="btn sad" onClick={() => { negativePolarity(); search(query); }}>
        Sad{/* Sad or Crying Emoji button */}
    </button>
  </div>
);

export default Search;
