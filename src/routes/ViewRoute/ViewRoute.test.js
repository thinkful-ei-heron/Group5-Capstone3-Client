import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import ViewRoute from './ViewRoute';
import { BookmarkContextProvider } from '../../contexts/BookmarkContext';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <BookmarkContextProvider>
        <ViewRoute />
      </BookmarkContextProvider>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})