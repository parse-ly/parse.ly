import React from 'react';

const SongListEntry = (props) => {
  const { song, songTitleClick } = props;
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
        {song.score}
      </div>
    </div>
  );
};

export default SongListEntry;
