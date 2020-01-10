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
    history.push('/login')
  };

  render() {
    return (
      <section className='registration'>
        <p>
          Sign up to save and manage your bookmarks
        </p>
        <h2>Sign up</h2>
        <Signup
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
};


export default SignupRoute;
