import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

function Header() {
  return (
    <header>
      <Link to={'/'}>
        <h1 className='headerTitle'>Bookmark Organizer</h1>
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
