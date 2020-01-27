import React from 'react';
import './LandingPage.css';
import exportHTML from '../../helpers/exportHTML';
import defaultBookmarks from '../../helpers/defaultBookmarks';

import { Link } from 'react-router-dom';

export default class LandingPage extends React.Component {
  handleSample = e => {
    e.preventDefault();
    exportHTML(defaultBookmarks, 'firefox');
  };
  render() {
    return (
      <section className="container LandingPage">
        <p>Export your bookmarks file from your browser:</p>
        <p>
          <a
            className="helpLink"
            href="https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer"
            alt="Export from Firefox"
          >
            Firefox
          </a>
        </p>
        <p>
          <a
            className="helpLink"
            href="https://support.google.com/chrome/answer/96816?hl=en"
            alt="Export from Chrome"
          >
            Chrome
          </a>
        </p>
        <p>
          <a
            className="helpLink"
            href="https://support.apple.com/guide/safari/import-bookmarks-and-history-ibrw1015/mac"
            alt="Export from Safari"
          >
            Safari
          </a>
        </p>
        <p>
          <a
            className="helpLink"
            href="https://support.microsoft.com/en-us/help/211089/how-to-import-and-export-the-internet-explorer-favorites-folder-to-a-3"
            alt="Export from IE"
          >
            Internet Explorer
          </a>
        </p>
        <p>
          <a
            className="helpLink"
            onClick={this.handleSample}
            href="#"
            alt="Sample Bookmarks"
          >
            Download a sample bookmarks file
          </a>
        </p>
        <p>
          You import the above file into the app and begin organizing :D
        </p>
        <p>You can export it back into your browser when you are done.</p>
        <p>
          Register an account, and you can save changes to your bookmarks and
          access them whenever you want.
        </p>
        <p className="landingText">
          To test features on this app using a demo account, please log in with
          <br />
          <code>
            username: <b>testuser</b>
            <br />
            password: <b>p4ssw0r|)</b>
          </code>
        </p>
        <Link to="/list">
          <button className="callToAction btn btnPrimary">Try it out →</button>
        </Link>
      </section>
    );
  }
}
