import React from 'react';
import './Nav.css';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service.js'

export default class Nav extends React.Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout();
  }

  renderLoggedInLinks() {
    return (
      <>
        <Link
          to={'/dashboard'}
          className={'tab'}
        >
          Dashboard
        </Link>
        <Link
          to={'/'}
          className={'tab'}
          onClick={this.handleLogoutClick}
        >
          Log Out
        </Link>
      </>
    )
  }

  renderLoggedOutLinks() {
    return (
      <>
        <Link to={'/login'} className={'tab'}>Log In</Link>
        <Link to={'/signup'} className={'tab'}>Sign Up</Link>
      </>
    )
  }

  render() {
    return (
      <nav>
        <Link to={'/list'} className={'tab'}>List</Link>
        {TokenService.hasAuthToken() ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
      </nav>
    );
  }
}
