import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import SongList from './components/SongList.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: '',
      query: '',
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <h1>Hello, world!</h1>
          <div className="searchbar">
            <Search />
          </div>
        </nav>
        <div className="section">
          <div className="player">
            <VideoPlayer />
          </div>
          <div className="songTitles">
            <SongList />
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));