import React from 'react';
import PropTypes from 'prop-types;'

const Search = (props) => {
  return (
    <div className="search-bar">
      <input className="form-control" type="text" />
      <button className="btn search">
        {/* OnClick/onSearch function needed */}
      </button>
      <button className="btn happy">
        {/* Happy Emoji button */}
      </button>
      <button className ="btn sad">
        {/* Sad or Crying Emoji button */}
      </button>
    </div>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;