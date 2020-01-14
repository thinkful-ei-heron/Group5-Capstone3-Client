import React from 'react';
import './Dashboard.css';
import UserService from '../../services/user-service';


class Dashboard extends React.Component {
  static defaultProps = {
    onPatchSettingsSuccess: ()=>{}
  }

  state = {
    error: null,
  }

  handlePreview = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({preview: Boolean(value)})
  }

  handleExtra = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({extra: Boolean(value)})
  }

  handleAutosave = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({autosave: Boolean(value)})
  }

  handleColor = ev => {
    this.setState({color: ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { previewImg, extraPanel, autosave, colorUI } = ev.target
    UserService.patchUserSettings({
      preview: previewImg.checked,
      extra: extraPanel.checked,
      autosave: autosave.checked,
      color: colorUI.value
    })
      .then(settings => {
        this.props.onPatchSettingsSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    UserService.getUserSettings()
    .then(settings => {
      settings = settings[0];
      this.setState({
        preview: settings.preview===true,
        extra: settings.extra===true,
        autosave: settings.autosave===true,
        color: settings.color
      })
    })
  }

  render() {
    return (
      <section className='container'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='previewImg'>Preview Images:</label>
          <input
            type='checkbox'
            name='previewImg' id='previewImg'
            onChange={this.handlePreview}
            checked={this.state.preview}
          />
          <br />
          <label htmlFor='extraPanel'>Extra Panel:</label>
          <input
            type='checkbox'
            name='extraPanel' id='extraPanel'
            onChange={this.handleExtra}
            checked={this.state.extra}
          />
          <br />
          <label htmlFor='autosave'>Autosave:</label>
          <input
            type='checkbox'
            name='autosave' id='autosave'
            onChange={this.handleAutosave}
            checked={this.state.autosave}
          />
          <br />
          <label htmlFor='colorUI'>Interface Color:</label>
          <input
            type='color'
            name='colorUI' id='colorUI'
            defaultValue='#ffffff'
            onChange={this.handleColor}
            value={this.state.color}
          />
          <br />
          <input type='submit' value='Save Changes' className='btn' />
        </form>
      </section>
    );
  }
}

export default Dashboard;
