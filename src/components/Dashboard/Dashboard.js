import React from 'react';
import './Dashboard.css';
import AuthApiService from '../../services/auth-api-service';

class Dashboard extends React.Component {
  static defaultProps = {
    onPatchSettingsSuccess: ()=>{}
  }

  state = {error: null}

  handleSubmit = ev => {
    ev.preventDefault();
    const { previewImg, extraPanel, autosave, colorUI } = ev.target
    console.log(previewImg.checked, extraPanel.checked, autosave.checked, colorUI.value);
    AuthApiService.patchUserSettings({
      preview: previewImg.checked,
      extra: extraPanel.checked,
      autosave: autosave.checked,
      color: colorUI.value
    })
      .then(settings => {
        console.log('after authapiservice patch');
        this.props.onPatchSettingsSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
  }

  render() {
    const { error } = this.state
    return (
      <section className='container'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='previewImg'>Preview Images:</label>
          <input
            type='checkbox'
            name='previewImg' id='previewImg'
            
          />
          <br />
          <label htmlFor='extraPanel'>Extra Panel:</label>
          <input
            type='checkbox'
            name='extraPanel' id='extraPanel'
            
          />
          <br />
          <label htmlFor='autosave'>Autosave:</label>
          <input
            type='checkbox'
            name='autosave' id='autosave'
          />
          <br />
          <label htmlFor='colorUI'>Interface Color:</label>
          <input
            type='color'
            name='colorUI' id='colorUI'
            defaultValue='#ffffff'
          />
          <br />
          <input type='submit' value='Save Changes' className='btn' />
        </form>
      </section>
    );
  }
}

export default Dashboard;
