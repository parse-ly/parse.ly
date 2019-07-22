import React from 'react';

import SongListEntry from './SongListEntry.jsx';

const SongList = (props) => {
  const { songs, polarity, songTitleClick } = props;
  let songview;
  if (polarity === 'positive') {
    songview = songs.filter(song => song.polarity === 'positive')
      .map((song, i) => <SongListEntry song={song} key={i} songTitleClick={songTitleClick} polarity={polarity} />);
  } else if (polarity === 'negative') {
    songview = songs.filter(song => song.polarity === 'negative')
      .map((song, i) => <SongListEntry song={song} key={i} songTitleClick={songTitleClick} polarity={polarity} />);
  }

  return (
    <React.Fragment>
    {/* <div className="lastContainer"> */}
    <div className="container">
      <ul className="left mplpx">
        {/* <SongListEntry /> */}
        {/* Map over each Song Entry to render in list form */}
        {/* {this props object will have an array of objects that will have
        these properties
        -songname
        -artist
        -score
        -polarity} */}
        {songview}
      </ul>
      </div>
      </React.Fragment>
  );
};

export default SongList;
