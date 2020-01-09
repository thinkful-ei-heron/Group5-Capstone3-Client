import React from 'react';
import './Login.css';

function Login() {
  return (
    <form className='container'>
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

export default Login;
