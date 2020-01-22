import React from 'react';
import { withRouter } from 'react-router-dom';
import TokenService from '../../services/token-service.js';
import UserContext from '../../contexts/UserContext';
import './Nav.css';

import { Link } from 'react-router-dom';

export default withRouter(class Nav extends React.Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    const root = document.documentElement;
    root.style.setProperty('--color-user', '#7F7F7F');

    this.context.processLogout();
  }

  renderLoggedInLinks() {
    return (
      <>
        <Link
          to={'/dashboard'}
          className={this.props.location.pathname === '/dashboard' ? 'tab activeTab' : 'tab'}
          id={'tab-dash'}
        >
          Dashboard
        </Link>
        <Link
          to={'/'}
          className={'tab'}
          id={'tab-logout'}
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
        <Link
          to={'/login'}
          className={this.props.location.pathname === '/login' ? 'tab activeTab' : 'tab'}
          id={'tab-login'}
        >
          Log In
        </Link>
        <Link
          to={'/signup'}
          className={this.props.location.pathname === '/signup' ? 'tab activeTab' : 'tab'}
          id={'tab-signup'}
        >
          Sign Up
        </Link>
      </>
    )
  }

  render() {
    return (
      <nav>
        <Link
          to={'/list'}
          className={this.props.location.pathname === '/list' ? 'tab activeTab' : 'tab'}
          id={'tab-list'}
        >
          List
        </Link>
        {TokenService.hasAuthToken() ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
      </nav>
    );
  }
})
