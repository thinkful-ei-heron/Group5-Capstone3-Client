import React from 'react';
import './Signup.css';

function Signup() {
  return (
    <form className='container'>
      <label for='username'>Choose username:</label>
      <br />
      <input type='text' name='username' id='username' autoFocus required />
      <br />
      <label for='email'>Would you like to give an email?</label>
      <br />
      <input type='email' name='email' id='email' />
      <br />
      <label for='password'>Choose password:</label>
      <br />
      <input type='password' name='password' id='password' required />
      <br />
      <label for='password'>Retype password:</label>
      <br />
      <input type='password' name='password' id='password' required />
      <br />
      <input type='submit' value='Submit' className='btn' />
    </form>
  );
}

export default Signup;
