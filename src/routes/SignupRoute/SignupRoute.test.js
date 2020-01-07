import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import SignupRoute from './SignupRoute'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <SignupRoute />
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})