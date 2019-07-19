import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './app.jsx';
import NavBar from './NavBar.jsx';
import Landing from './Landing.jsx';
import Login from './components/Login.jsx';


// require('./stylesheets/base.scss');
const routing = (
  <Router>
  <Switch>
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route path="/music" component={App} />
    </React.Fragment>
    </Switch>
  </Router>
);

ReactDOM.render(
  routing, document.getElementById('root'),
);
