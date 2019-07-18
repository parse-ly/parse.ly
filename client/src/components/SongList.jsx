import React from 'react';

import SongListEntry from './SongListEntry.jsx';

const SongList = (props) => {
  return (
    <div className="song-list">
      <SongListEntry />
      {/* Map over each Song Entry to render in list form */}
    </div>
  );
};

export default SongList;
