import React from "react";
import "./LandingPage.css";

import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="container">
      <p className="landingText">
        Import a file as created by your browser's "Export Bookmarks" function,
        then organize the list using search and sort capabilities. Export your
        new list to be brought back into your browser. Register an account, and
        you can save changes to your bookmarks and access them whenever you
        want.
      </p>
<<<<<<< HEAD
      <Link to="/list">
        <button className="callToAction btn btnPrimary">Try it out →</button>
=======
      <br></br>
      <p className='landingText'>
        To test features on this app using a demo account, please log in with the username 'testuser' and the password 'p4ssw0r|)'.
      </p>
      <Link to='/list' >
        <button className='callToAction btn btnPrimary'>Try it out →</button>
>>>>>>> origin/kei-review
      </Link>
    </section>
  );
}
