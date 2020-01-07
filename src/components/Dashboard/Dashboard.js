import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <section>
      <form>
        <label>Preview Images:</label>
        <input type='checkbox' name='previewImg' checked />
        <label>Extra Panel:</label>
        <input type='checkbox' name='extraPanel' checked />
        <label>Autosave:</label>
        <input type='checkbox' name='autosave' />
        <label>Interface Color:</label>
        <input type='color' name='colorUI' value='#ffffff' />
        <input type='submit' value='Save Changes' />
      </form>
    </section>
  );
}

export default Dashboard;
