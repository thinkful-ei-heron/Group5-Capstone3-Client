import React from 'react';
import './DashboardRoute.css';

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
        <h2>Dashboard</h2>
        <Dashboard onPatchSettingsSuccess={this.handlePatchSettingsSuccess}/>
      </div>
    );
  }
}

export default DashboardRoute;
