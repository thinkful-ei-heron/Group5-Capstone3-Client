import React from 'react';
import UserContext from '../../contexts/UserContext';
import './Login.css';

import AuthApiService from '../../services/auth-api-service';

export default class Login extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  submitHandler = ev => {
    ev.preventDefault();
    const { username, password } = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form className='container' onSubmit={this.submitHandler}>
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <label htmlFor='username'>Username:</label>
        <br />
        <input
          type='text'
          name='username' id='username'
          required
          autoFocus
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <br />
        <input
          type='password'
          name='password' id='password'
          required
        />
        <br />
        <input type='submit' value='Submit' className='btn' />
        <input type='reset' value='Reset' className='btn' />
      </form>
    );
  }
}
