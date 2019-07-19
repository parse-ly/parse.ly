import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './app.jsx';
import Login from './components/Login.jsx';


// require('./stylesheets/base.scss');
const routing = (
  <Router>
    <div>
      <Route path="/" component={Login} />
      <Route path="/music" component={App} />
    </div>
  </Router>
);

ReactDOM.render(
  routing, document.getElementById('root'),
);
