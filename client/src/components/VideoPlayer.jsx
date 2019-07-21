import React from 'react';

const VideoPlayer = ({video}) => {
  // const video = props.video;
  // Conditional Rendering Statement needed
  if (!video) {
    return <div>Loading...</div>;
  }
  // const videoId = video.id.videoId;
  // const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-player">
      <div className="embed-responsive">
        <iframe className="embed-responsive-item" src={video} allowFullScreen>
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

export default VideoPlayer;
