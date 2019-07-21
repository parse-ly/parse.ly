import React from 'react';

const SongListEntry = (props) => {
  const { song, songTitleClick, polarity } = props;
  const titleClick = () => {
    songTitleClick(song.songname);
  };
  return (
    <li className="song-list-entry">
      <div className="song-title" onClick={titleClick} >
        <b>Title: </b>
        {song.songname}
      </div>
      <div className="artist-name">
        <b>Artist: </b>
        {song.artist}
      </div>
      <div className="score">
        <b>Score: </b>
        {`${Math.floor(song.score * 100)}% ${polarity} lyrics`}
      </div>
    </li>
  );
};

export default SongListEntry;
