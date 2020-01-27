/* eslint-disable no-useless-escape */
import React from "react";
import "./Signup.css";
import AuthApiService from "../../services/auth-api-service";

export default class Signup extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = {
    error: null,
    username: {
      value: "",
      touched: false
    },
    password: {
      value: "",
      touched: false
    },
    email: {
      value: "",
      touched: false
    }
  };

  updateUsername(username) {
    this.setState({ username: { value: username, touched: true } });
  }

  updateEmail(email) {
    this.setState({ email: { value: email, touched: true } });
  }

  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  validatePassword() {
    const password = this.state.password.value.trim();

    if (password.length === 0) {
      return "Password is required.";
    } else if (password.length < 8 || password.length > 72) {
      return "Password must be between 8 and 72 characters long.";
    } else if (!password.match(/[0-9]/)) {
<<<<<<< HEAD
      return "Password must contain at least one number.";
    } else if (!password.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
      return "Password must contain at least one symbol.";
=======
      return 'Password must contain at least one number.';
    } else if (!password.match(/[-#@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
      return 'Password must contain at least one symbol.';
>>>>>>> origin/kei-review
    }
    return "Password meets length, number, and symbol criteria.";
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password, email } = this.state;
    AuthApiService.postUser({
      username: username.value,
      email: email.value,
      password: password.value
    })
<<<<<<< HEAD
      .then(user => {
        username.value = "";
        email.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
=======
      .then( () => {
        username.value = ''
        email.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
>>>>>>> origin/kei-review
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
<<<<<<< HEAD
    const { error } = this.state;

=======
    const { error } = this.state
>>>>>>> origin/kei-review
    return (
      <form onSubmit={this.handleSubmit} className="container">
        <div role="alert">{error && <p>{error}</p>}</div>
        <label htmlFor="username">Choose username:</label>
        <br />
        <input
          ref={this.firstInput}
<<<<<<< HEAD
          type="text"
          name="username"
          id="username"
          className="unloggedInput"
=======
          type='text'
          name='username' id='username'
          className='unloggedInput'
          autoComplete='username'
>>>>>>> origin/kei-review
          required
          autoFocus
          onChange={e => this.updateUsername(e.target.value)}
        />
        <br />
<<<<<<< HEAD
        <label htmlFor="email">Would you like to give an email?</label>
=======
        <label htmlFor='email'>Provide an email (optional):</label>
>>>>>>> origin/kei-review
        <br />
        <input
          type="email"
          name="email"
          id="email"
          className="unloggedInput"
          onChange={e => this.updateEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Choose password:</label>
        <br />
        <input
<<<<<<< HEAD
          type="password"
          name="password"
          id="password"
          className="unloggedInput"
=======
          type='password'
          name='password' id='password'
          className='unloggedInput'
          autoComplete='new-password'
>>>>>>> origin/kei-review
          required
          onChange={e => this.updatePassword(e.target.value)}
        />
        {this.state.password.touched && <p>{this.validatePassword()}</p>}
        <br />
<<<<<<< HEAD
        <input type="submit" value="Submit" className="btn btnPrimary" />
        <input type="reset" value="Reset" className="btn" />
=======
        <input
          type='submit'
          value='Submit'
          className={this.validatePassword() === 'Password meets length, number, and symbol criteria.' ? 'btn btnPrimary': 'btn btnPrimary noHover'}
        />
        <input
          type='reset'
          value='Reset'
          className='btn'
        />
>>>>>>> origin/kei-review
      </form>
    );
  }
}
