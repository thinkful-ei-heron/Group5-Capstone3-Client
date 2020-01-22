import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import BookmarkManager from './BookmarkManager';
import {BookmarkContextProvider} from '../../contexts/BookmarkContext'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <BookmarkContextProvider>
          <BookmarkManager />
        </BookmarkContextProvider>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})