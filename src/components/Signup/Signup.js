import React from 'react';
import './Signup.css';
import AuthApiService from '../../services/auth-api-service';

class Signup extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: ()=>{}
  }

  state = {
    error: null,
    username: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    email: {
      value: '',
      touched: false
    },
  }

  updateUsername(username) {
    this.setState({username: {value: username, touched: true}})
  }

  updateEmail(email) {
    this.setState({email: {value: email, touched: true}})
  }

  updatePassword(password) {
    this.setState({password: {value: password, touched: true}})
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return 'Password is required.';
    } else if (password.length < 8 || password.length > 72) {
      return 'Password must be between 8 and 72 characters long.';
    } else if (!password.match(/[0-9]/)) {
      return 'Password must contain at least one number.';
    } else if (!password.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
      return 'Password must contain at least one symbol.';
    } else {
      return 'Password meets length, number, and symbol criteria.'
    }
  }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password, email } = this.state;
    AuthApiService.postUser({
      username: username.value,
      email: email.value,
      password: password.value,
    })
      .then(user => {
        username.value = ''
        email.value = ''
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
          className='unloggedInput'
          required
          autoFocus
          onChange={e => this.updateUsername(e.target.value)}
        />
        <br />
        <label htmlFor='email'>Would you like to give an email?</label>
        <br />
        <input
          type='email'
          name='email' id='email'
          className='unloggedInput'
          onChange={e => this.updateEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Choose password:</label>
        <br />
        <input
          type='password'
          name='password' id='password'
          className='unloggedInput'
          required
          onChange={e => this.updatePassword(e.target.value)}
        />
        {this.state.password.touched && <p>{this.validatePassword()}</p>}
        <br />
        <input type='submit' value='Submit' className='btn btnPrimary' />
        <input type='reset' value='Reset' className='btn' />
      </form>
    );
  }

}

export default Signup;
