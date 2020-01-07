import React from 'react';
import './Nav.css';

import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to={'/list'}>List</Link>
      {' - '}
      <Link to={'/login'}>Log In</Link>
      {' - '}
      <Link to={'/signup'}>Sign Up</Link>
      {' - '}
      <Link to={'/dashboard'}>Dashboard</Link>
    </nav>
  );
}

export default Nav;
