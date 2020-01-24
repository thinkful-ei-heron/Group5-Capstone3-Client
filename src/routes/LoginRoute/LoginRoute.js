import React from 'react';
import './LoginRoute.css';

import Login from '../../components/Login/Login';

class LoginRoute extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/list'
    history.push(destination)
  };

  render() {
    return (
      <section className='login marginTop'>
        <h2>Login</h2>
        <Login
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  };
};

export default LoginRoute;
