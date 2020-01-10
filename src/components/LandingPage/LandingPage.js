import React from 'react';
import './LandingPage.css';

import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <section className='container'>
      <p className='landingText'>Import a file as created by your browser's "Export Bookmarks" function, then organize the list using search and sort capabilities. Export your new list to be brought back into your browser. With an account you can save your lists for later.</p>
      <Link to='/list' >
        <button className='callToAction btn'>Try it out -></button>
      </Link>
    </section>
  );
}

export default LandingPage;
