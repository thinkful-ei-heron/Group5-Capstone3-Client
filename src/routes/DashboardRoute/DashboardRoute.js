import React from 'react';
import './DashboardRoute.css';

import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'
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
