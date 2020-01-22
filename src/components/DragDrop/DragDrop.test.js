import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import DragDrop from './DragDrop';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <DragDrop />
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})