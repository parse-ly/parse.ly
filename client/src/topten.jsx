import React from 'react';
import axios from 'axios';
import Navigation from './navbar.jsx';

class TopTen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: [],
      negative: [],
    };
    this.getSongs = this.getSongs.bind(this);
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs() {
    axios.get('/topten/positive')
      .then((response) => {
        this.setState({
          positive: response.data,
        });
      })
      .catch(err => console.error(err));
    axios.get('/topten/negative')
      .then((response) => {
        this.setState({
          negative: response.data,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <ul className="list-group">
        {/* Map Song List Entry ??  */}
        {/* Include Song Video Player */}
      </ul>
      </React.Fragment>
    );
  }
}

export default TopTen;
