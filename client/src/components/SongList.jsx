import React from 'react';

import SongListEntry from './SongListEntry.jsx';

const SongList = (props) => {
  return (
    <div className="song-list">
      <SongListEntry />
      {/* Map over each Song Entry to render in list form */}
      {/* {this props object will have an array of objects that will have
      these properties
      -songname
      -artist
      -score
      -polarity} */}
    </div>
  );
};

export default SongList;
