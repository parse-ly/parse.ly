import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './app.jsx';
import Login from './components/Login.jsx';


// require('./stylesheets/base.scss');
const routing = (
  <Router>
  <Switch>
    <div>
      <Route path="/" component={App} />
      <Route path="/music" component={App} />
    </div>
    </Switch>
  </Router>
);

ReactDOM.render(
  routing, document.getElementById('root'),
);
