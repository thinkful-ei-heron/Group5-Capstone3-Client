import React from 'react';
import './DashboardRoute.css';
<<<<<<< HEAD
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
=======
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'
>>>>>>> c270215b3cc783abfb9bf02c4cb4ac4b7331a9a7
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
<<<<<<< HEAD
>>>>>>> 15ce5b2a6759d28e8894fdc6df83810b1f13d3fa
=======
>>>>>>> c270215b3cc783abfb9bf02c4cb4ac4b7331a9a7

  render() {
    return (
      <div>
        <BookmarkManager />
        <h2>Dashboard</h2>
  
        <Dashboard onPatchSettingsSuccess={this.handlePatchSettingsSuccess}/>
      </div>
    );
  }
}

export default DashboardRoute;
