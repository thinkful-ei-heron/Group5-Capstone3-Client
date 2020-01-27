import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import PublicOnlyRoute from './PublicOnlyRoute';
import SignupRoute from '../SignupRoute/SignupRoute';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <PublicOnlyRoute path={'/signup'} component={SignupRoute}/>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})