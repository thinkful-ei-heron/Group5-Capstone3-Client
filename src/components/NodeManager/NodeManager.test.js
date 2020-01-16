import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import NodeManager from './NodeManager';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NodeManager />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
