import React from 'react';
import './Nav.css';

import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to={'/list'} className={'btn'}>List</Link>
      <Link to={'/login'} className={'btn'}>Log In</Link>
      <Link to={'/signup'} className={'btn'}>Sign Up</Link>
      <Link to={'/dashboard'} className={'btn'}>Dashboard</Link>
      <Link to={'/'} className={'btn'}>Log Out</Link>
    </nav>
  );
}

export default Nav;
