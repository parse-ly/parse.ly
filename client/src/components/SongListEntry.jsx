const SongListEntry = (props) => {
  return (
    <div className ="song-list-entry">
      <div className="song-title">
        {/* Song title */}
        {/* On click function needed */}
      </div>
      <div className="artist-name">
        {/* Artist */}
      </div>
      <div className="score">
        {/* Score */}
      </div>
    </div>
  )
}

SongListEntry.propTypes = {
  song: React.PropTypes.object.isRequired,
}

export default SongListEntry;