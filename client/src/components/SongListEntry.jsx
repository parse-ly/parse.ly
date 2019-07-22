import React from 'react';

const SongListEntry = (props) => {
  const { song, songTitleClick, polarity } = props;
  const titleClick = () => {
    songTitleClick(song.songname);
  };
  return (
    <li className="listItems">
      {/* <div className="artist-name">
        <b>Artist: </b>
        {song.artist}
      </div> */}
      <div className="song-title" onClick={titleClick} >
      {song.artist} | {song.songname}
      </div>
      
      <div className="score">
        <b>Score: </b>
        {`${Math.floor(song.score * 100)}% ${polarity} lyrics`}
      </div>
    </li>
  );
};

export default SongListEntry;
