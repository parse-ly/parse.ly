import React from 'react';

const SongListEntry = (props) => {
  const { song, songTitleClick, polarity } = props;
  const titleClick = () => {
    songTitleClick(song.songname);
  };
  return (
    <div className="song-list-entry">
      <div className="song-title" onClick={titleClick} >
        {/* Song title */}
        {/* On click function needed */}
        {song.songname}
      </div>
      <div className="artist-name">
        {/* Artist */}
        {song.artist}
      </div>
      <div className="score">
        {/* Score */}
        {`${Math.floor(song.score * 100)}% ${polarity} lyrics`}
      </div>
    </div>
  );
};

export default SongListEntry;
