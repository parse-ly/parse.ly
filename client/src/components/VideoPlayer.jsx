import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const video = props.video;
  // Conditional Rendering Statement needed
  if (!video) {
    return <div>Loading...</div>;
  }
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-player">
      <div className="embed-responsive">
        <iframe className="embed-responsive-item" src={url} allowFullScreen>
          {/* Video player with youtube link from api */}
        </iframe>
      </div>
      <div className="details">
        <h3>
          {/* Song Title */}
        </h3>
        <div>
          {/* Song Info; maybe Score info? */}
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  video: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired,
}

export default VideoPlayer;