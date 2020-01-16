import React from 'react';
import UserService from '../../services/user-service';
import './Dashboard.css';

export default class Dashboard extends React.Component {
  static defaultProps = {
    onPatchSettingsSuccess: () => { }
  }
  _isMounted = false;

  state = {
    error: null,

    activeList: 'List',

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
            extra: settings.extra === true,
            autosave: settings.autosave === true,
            color: settings.color
          })
        }
      })
  }

  componentDidUpdate() {
    setTimeout(() => this.setState({ submitted: false }), 5000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLoad = () => {

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
    this.setState({ preview: Boolean(value) })
  }

  handleExtra = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ extra: Boolean(value) })
  }

  handleAutosave = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ autosave: Boolean(value) })
  }

  handleColor = ev => {
    this.setState({ color: ev.target.value })
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ submitted: true })
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

  render() {
    const classes = this.state.submitted ? 'save' : 'save hide';
    const list = this.state.activeList;

    return (
      <section className='container'>
        <div className='listManager'>
          <p>Currently loaded list: {list}</p>
          {!this.state.deleting
            ? <div>
              <label htmlFor='userLists'>Your saved lists:</label><br />
              <select id='userLists'>
                <option>List 1</option>
                <option>List 2</option>
                <option>List 3</option>
              </select>
              <button className='btn' onClick={this.handleLoad}>Load</button>
              <button className='btn' onClick={this.handleDelete}>Delete</button><br />
            </div>
            : <div className='deleteConfirm'>
              <p>Are you sure you want to delete {list}?</p>
              <button className='btn' onClick={this.confirmDelete}>Delete</button>
              <button className='btn' onClick={this.cancelDelete}>Cancel</button><br />
            </div>
          }
        </div>

        <div className='userSettings'>
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
            <input
              type='submit'
              value='Save Changes'
              className='btn'
            />
          </form>

          <p className={classes}>Settings saved!</p>
        </div>
      </section>
    );
  }
}
