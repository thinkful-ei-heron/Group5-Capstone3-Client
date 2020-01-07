import React from 'react';
import './Login.css';

function Login() {
  return (
    <form>
      <label for='username'>Username:</label>
      <br />
      <input type='text' name='username' id='username' required />
      <br />
      <label for='password'>Password:</label>
      <br />
      <input type='password' name='password' id='password' required />
      <br />
      <input type='submit' value='Submit' />
    </form>
  );
}

export default Login;
