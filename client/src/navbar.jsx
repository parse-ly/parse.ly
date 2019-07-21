import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
return (
  <nav className="blue accent-3" role="navigation">
    <div className="nav-wrapper">
      <div className="col s12">
      <p 
        id="nav-mobile" 
        className="right">
          <Link className="NavLink" to="/topten"
          >Top 10</Link>
      </p>
      <a href="/music" className="brand-logo center">Find Your Beat</a>
      <a href="#" data-activates="mobile-demo" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
      </div>
    </div>
  </nav>
)
}

export default Navigation;