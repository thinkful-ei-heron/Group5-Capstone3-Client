import React from 'react';
import './SettingsRoute.css';

import Settings from '../../components/Settings/Settings';

export default class SettingsRoute extends React.Component {
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
      <div className='marginTop'>
        <h2>Settings</h2>
        <Settings onPatchSettingsSuccess={this.handlePatchSettingsSuccess}/>
      </div>
    );
  }
}
