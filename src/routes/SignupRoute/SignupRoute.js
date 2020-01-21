import React from 'react';
import Signup from '../../components/Signup/Signup'
import './SignupRoute.css';

class SignupRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/dashboard')
  };

  render() {
    return (
      <section className='registration'>
        <h2>Sign up</h2>
        <p className='landingText'>Sign up to save and manage your bookmarks</p>
        <Signup
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
};


export default SignupRoute;
