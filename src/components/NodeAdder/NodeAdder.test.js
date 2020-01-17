import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import NodeAdder from './NodeAdder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NodeAdder />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
