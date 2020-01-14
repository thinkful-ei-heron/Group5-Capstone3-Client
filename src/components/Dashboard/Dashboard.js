import React from 'react';
import './Dashboard.css';
import UserService from '../../services/user-service';


class Dashboard extends React.Component {
  static defaultProps = {
    onPatchSettingsSuccess: ()=>{}
  }

  state = {
    error: null,
    preview: false,
    autosave: false,
    extra: false,
    color: '#7F7F7F',
    submitted: false
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
    this.setState({submitted: true})
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
        this.setState({
          error: res.error,
        })
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

  componentDidUpdate(){
    setTimeout(() => this.setState({submitted: false}), 5000);
  }

  render() {
    const classes = this.state.submitted ? 'save' : 'save hide'
    return (
      <section className='container'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='previewImg'>Preview Images:</label>
          <input
            type='checkbox'
            name='previewImg' id='previewImg'
            checked={this.state.preview}
            onChange={this.handlePreview}

          />
          <br />
          <label htmlFor='extraPanel'>Extra Panel:</label>
          <input
            type='checkbox'
            name='extraPanel' id='extraPanel'
            checked={this.state.extra}
            onChange={this.handleExtra}
          />
          <br />
          <label htmlFor='autosave'>Autosave:</label>
          <input
            type='checkbox'
            name='autosave' id='autosave'
            checked={this.state.autosave}
            onChange={this.handleAutosave}
          />
          <br />
          <label htmlFor='colorUI'>Interface Color:</label>
          <input
            type='color'
            name='colorUI' id='colorUI'
            value={this.state.color}
            onChange={this.handleColor}
          />
          <br />
          <input type='submit' value='Save Changes' className='btn' />
        </form>
        
        <p className={classes}>Settings saved!</p>
      </section>
    );
  }
}

export default Dashboard;
