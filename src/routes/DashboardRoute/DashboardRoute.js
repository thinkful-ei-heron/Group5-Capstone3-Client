import React from 'react';
import './DashboardRoute.css';
import ImportBookmarks from '../../components/ImportBookmarks/ImportBookmarks'

import Dashboard from '../../components/Dashboard/Dashboard';

function DashboardRoute() {
  return (
    <div>
      <h2>Dashboard</h2>
      <ImportBookmarks />
      <Dashboard />
    </div>
  );
}

export default DashboardRoute;
