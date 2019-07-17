import React from 'react';
import PropTypes from 'prop-types';

import SongListEntry from './SongListEntry.jsx';

const SongList = (props) => {
  return (
    <div className="song-list">
      <SongListEntry />
      {/* Map over each Song Entry to render in list form */}
    </div>
  )
}

SongList.propTypes = {
  songs: React.PropTypes.array.isRequired,
};

export default SongList;
