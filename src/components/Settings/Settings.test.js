import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import Settings from './Settings'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})