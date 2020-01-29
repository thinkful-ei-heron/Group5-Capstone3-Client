import React, { useContext } from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import BookmarkContext from '../../contexts/BookmarkContext';

function Header() {
  const ctx = useContext(BookmarkContext);

  const clearBookmarks = () => {
    ctx.setBookmarks([]);
  };

  return (
    <header className="header-section">
      <Link to={'/'}>
        <h1 className="headerTitle">Bookmark Organizer</h1>
      </Link>
      <Nav clearBookmarks={clearBookmarks} />
    </header>
  );
}

export default Header;
