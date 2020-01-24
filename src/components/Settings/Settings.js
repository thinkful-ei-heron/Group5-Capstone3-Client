import React from 'react';
import UserService from '../../services/user-service';
import './Settings.css';

export default class Settings extends React.Component {
  _isMounted = false;

  static defaultProps = {
    onPatchSettingsSuccess: () => { }
  }

  state = {
    error: null,
    activeList: '',
    preview: false,
    autosave: false,
    extra: false,
    color: '#7F7F7F',
    submitted: false,
    deleting: false
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getUserSettings()
      .then(settings => {
        settings = settings[0];
        if (this._isMounted) {
          this.setState({
            preview: settings.preview === true,
            autosave: settings.autosave === true,
            color: settings.color
          })
        }
      })
  }

  componentDidUpdate() {
    setTimeout(() => this._isMounted && this.setState({ submitted: false }), 5000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleDelete = () => {
    this.setState({ deleting: true })
  }

  confirmDelete = () => {
    this.setState({ deleting: false })
  }

  cancelDelete = () => {
    this.setState({ deleting: false })
  }

  handlePreview = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ preview: Boolean(value) });
  }

  handleExtra = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ extra: Boolean(value) });
  }

  handleAutosave = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ autosave: Boolean(value) });
  }

  handleColor = ev => {
    const color = ev.target.value;
    const root = document.documentElement;
    root.style.setProperty('--color-user', color);
    this.setState({ color });
  }

  handleSubmit = ev => {
    ev.preventDefault();
    if (this._isMounted) {
      this.setState({ submitted: true })
    }
    const { previewImg, autosave, colorUI } = ev.target
    UserService.patchUserSettings({
      preview: previewImg.checked,
      autosave: autosave.checked,
      color: colorUI.value
    })
      .then(() => this.props.onPatchSettingsSuccess())
      .catch(res => {
        this.setState({
          error: res.error,
        })
      })
  }

  render() {
    const classes = this.state.submitted ? 'save' : 'save hide';

    return (
      <section className='container'>
        <form onSubmit={this.handleSubmit}>
          <div className='flex'>
            <label className='dash-label' htmlFor='previewImg'>Preview Images:</label>
            <input
              type='checkbox'
              name='previewImg' id='previewImg'
              checked={this.state.preview}
              onChange={this.handlePreview}
              className='dash-input'
            />
          </div>
          <br />
          <div className='flex'>
            <label className='dash-label' htmlFor='autosave'>Autosave:</label>
            <input
              type='checkbox'
              name='autosave' id='autosave'
              checked={this.state.autosave}
              onChange={this.handleAutosave}
              className='dash-input'
            />
          </div>
          <br />
          <div className='flex'>
            <label className='dash-label' htmlFor='colorUI'>Interface Color:</label>
            <input
              className='dash-color'
              type='color'
              name='colorUI' id='colorUI'
              value={this.state.color}
              onChange={this.handleColor}
            />
          </div>
          <br />
          <input
            type='submit'
            value='Save Changes'
            className='btn savebtn'
          />
        </form>
        <p className={classes}>Settings saved!</p>
      </section>
    );
  }
}
