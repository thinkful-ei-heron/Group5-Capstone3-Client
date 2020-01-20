import React from 'react';
import './ViewRoute.css';
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'
import ImportBookmarks from '../../components/ImportBookmarks/ImportBookmarks';

function ViewRoute() {
  return (
    <div>
      <ImportBookmarks />
      <BookmarkManager />
    </div>
  );
}

export default ViewRoute;
