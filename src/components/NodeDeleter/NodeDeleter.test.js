import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import NodeDeleter from './NodeDeleter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NodeDeleter />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
