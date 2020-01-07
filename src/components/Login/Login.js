import React from 'react';
import './Login.css';

function Login() {
  return (
    <form className='container'>
      <label for='username'>Username:</label>
      <br />
      <input type='text' name='username' id='username' autoFocus required />
      <br />
      <label for='password'>Password:</label>
      <br />
      <input type='password' name='password' id='password' required />
      <br />
      <input type='submit' value='Submit' className='btn' />
    </form>
  );
}

export default Login;
