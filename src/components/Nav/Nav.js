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
        <Link to={'/list'} className={'btn'}>List</Link>
        <Link to={'/dashboard'} className={'btn'}>Dashboard</Link>
        <Link to={'/'} className={'btn'} onClick={this.handleLogoutClick}>Log Out</Link>
      </>
    )
  }

  renderLoggedOutLinks() {
    return (
      <>
        <Link to={'/login'} className={'btn'}>Log In</Link>
        <Link to={'/signup'} className={'btn'}>Sign Up</Link>
      </>
    )
  }

  render() {
    return (
      <nav>
        {TokenService.hasAuthToken() ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
      </nav>
    );  
  }
}
