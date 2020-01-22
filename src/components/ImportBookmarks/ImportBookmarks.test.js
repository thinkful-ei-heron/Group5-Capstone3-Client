import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import ImportBookmarks from './ImportBookmarks';
import { BookmarkContextProvider } from '../../contexts/BookmarkContext';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <BookmarkContextProvider>
        <ImportBookmarks />
      </BookmarkContextProvider>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})