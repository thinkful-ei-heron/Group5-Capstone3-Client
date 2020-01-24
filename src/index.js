import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App/App';
import { UserProvider } from './contexts/UserContext';
import { BookmarkContextProvider } from './contexts/BookmarkContext';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <BookmarkContextProvider>
        <Route path='/'>
          <App />
        </Route>
      </BookmarkContextProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
