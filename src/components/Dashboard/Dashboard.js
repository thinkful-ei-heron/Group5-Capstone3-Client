import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <section>
      <form>
        <label for='previewImg'>Preview Images:</label>
        <input type='checkbox' name='previewImg' id='previewImg' checked />
        <br />
        <label for='extraPanel'>Extra Panel:</label>
        <input type='checkbox' name='extraPanel' id='extraPanel' checked />
        <br />
        <label for='autosave'>Autosave:</label>
        <input type='checkbox' name='autosave' id='autosave' />
        <br />
        <label for='colorUI'>Interface Color:</label>
        <input type='color' name='colorUI' id='colorUI' value='#ffffff' />
        <br />
        <input type='submit' value='Save Changes' />
      </form>
    </section>
  );
}

export default Dashboard;
