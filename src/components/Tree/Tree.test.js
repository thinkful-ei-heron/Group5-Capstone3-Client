import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom';
import Tree from './Tree';
import { BookmarkContextProvider } from '../../contexts/BookmarkContext';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <BookmarkContextProvider>
        <Tree />
      </BookmarkContextProvider>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})