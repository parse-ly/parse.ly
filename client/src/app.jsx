import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import styles from '../dist/player.css';
import Navigation from './navbar.jsx';
import Search from './components/Search.jsx';
import SongList from './components/SongList.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: '',
      query: '',
      songs: [],
      polarity: '',
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.songTitleClick = this.songTitleClick.bind(this);
    this.handlePositivePolarity = this.handlePositivePolarity.bind(this);
    this.handleNegativePolarity = this.handleNegativePolarity.bind(this);
  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      this.props.history.push('/music');
    }
  }

  clickSearch() {
    const { query } = this.state;
    return axios.get(`/search/${query}`).then((response) => {
      this.setState({
        songs: response.data,
      });
    });
  }

  handleChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  songTitleClick(title) {
    return axios.get(`/video/${title}`).then((response) => {
      this.setState({
        video: response.data,
      });
    });
  }

  handleNegativePolarity() {
    this.setState({
      polarity: 'negative',
    });
  }

  handlePositivePolarity() {
    this.setState({
      polarity: 'positive',
    });
  }


  render() {
    const {
      query, songs, polarity, video,
    } = this.state;
    return (
      <React.Fragment>
        <Navigation />
        <div className="container">
          <h3>Who do you want to listen to?</h3>
          <div className="col-md-6 offset-md-3">
            <Search
              query={query}
              change={this.handleChange}
              search={this.clickSearch}
              positivePolarity={this.handlePositivePolarity}
              negativePolarity={this.handleNegativePolarity}
            />
          </div>
        <div className="section">
          <div className="player">
            <VideoPlayer video={video} />
          </div>
          <div className="songTitles">
            <SongList songs={songs} polarity={polarity} songTitleClick={this.songTitleClick} />
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
