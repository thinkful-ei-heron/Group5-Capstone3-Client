import React from 'react';
import './DashboardRoute.css';
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'

import Dashboard from '../../components/Dashboard/Dashboard';

function DashboardRoute() {
  return (
    <div>
      <BookmarkManager />
      <h2>Dashboard</h2>

      <Dashboard />
    </div>
  );
}

export default DashboardRoute;
