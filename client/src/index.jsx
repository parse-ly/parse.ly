import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    state: {

    };
  }

  render() {
    return (
    <div>
      <h1>Hello, world!</h1>
    </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));