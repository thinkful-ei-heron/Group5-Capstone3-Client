import React from 'react';
import './DashboardRoute.css';
import ImportBookmarks from '../../components/ImportBookmarks/ImportBookmarks'
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  handlePatchSettingsSuccess = () => {
    console.log('patch settings success');
    const { history } = this.props
    history.push('/list')
  };

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
