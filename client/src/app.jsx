import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import NavBar from './NavBar.jsx';
import Landing from './Landing.jsx';
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
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  componentWillMount() {
    let query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      this.props.history.push('/');
    }
  }

  render() {
    const { query } = this.state;
    return (
      <React.Fragment>
        
        <nav className="navbar">
          <h1>Who do you want to listen to?</h1>
          <div className="searchbar">
            <Search query={query} change={this.handleChange} search={this.clickSearch} />
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
      </React.Fragment>
    );
  }
}

export default App;
// ReactDom.render(<App />, document.getElementById('app'));
