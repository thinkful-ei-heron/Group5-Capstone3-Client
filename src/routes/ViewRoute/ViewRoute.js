import React from 'react';
import './ViewRoute.css';
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'
import { BrowserRouter } from 'react-router-dom'

function ViewRoute() {
  return (
    <div className="ManagerView">
      <BrowserRouter>
        <BookmarkManager />
      </BrowserRouter>
    </div>
  );
}

export default ViewRoute;
