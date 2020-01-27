import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import PrivateOnlyRoute from './PrivateOnlyRoute';
import SettingsRoute from '../SettingsRoute/SettingsRoute';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <PrivateOnlyRoute path={'/settings'} component={SettingsRoute}/>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})