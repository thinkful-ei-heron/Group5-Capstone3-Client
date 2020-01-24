import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import RemoteListChooser from './RemoteListChooser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RemoteListChooser />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
