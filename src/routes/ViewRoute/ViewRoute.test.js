import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import ViewRoute from './ViewRoute';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ViewRoute />
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})