import React from 'react';
import './Signup.css';
import AuthApiService from '../../services/auth-api-service';

class Signup extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: ()=>{}
  }

  state = {error: null}

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password, email } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    })
      .then(user => {
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className='container'
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <label htmlFor='username'>Choose username:</label>
        <br />
        <input
          ref={this.firstInput}
          type='text'
          name='username' id='username'
          required
          autoFocus
        />
        <br />
        <label htmlFor='email'>Would you like to give an email?</label>
        <br />
        <input type='email' name='email' id='email' />
        <br />
        <label htmlFor='password'>Choose password:</label>
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

export default Signup;
