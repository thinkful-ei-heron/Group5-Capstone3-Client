import React from 'react';
import './DashboardRoute.css';
<<<<<<< HEAD
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'

import Dashboard from '../../components/Dashboard/Dashboard';

function DashboardRoute() {
  return (
    <div>
      <BookmarkManager />
      <h2>Dashboard</h2>
=======
import ImportBookmarks from '../../components/ImportBookmarks/ImportBookmarks'
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  handlePatchSettingsSuccess = () => {
    const { history } = this.props
    history.push('/list')
  };
>>>>>>> 15ce5b2a6759d28e8894fdc6df83810b1f13d3fa

  render() {
    return (
      <div>
        <ImportBookmarks />
        <h2>Dashboard</h2>
  
        <Dashboard onPatchSettingsSuccess={this.handlePatchSettingsSuccess}/>
      </div>
    );
  }
}

export default DashboardRoute;
