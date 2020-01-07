import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import Toolbar from './Toolbar'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Toolbar />
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})