import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import PrivateOnlyRoute from './PrivateOnlyRoute'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <PrivateOnlyRoute />
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})