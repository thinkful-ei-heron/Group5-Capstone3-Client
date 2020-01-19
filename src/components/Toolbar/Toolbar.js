import React, { Component } from 'react';
import BookmarkContext from '../../contexts/BookmarkContext';
import exportHTML from '../../helpers/exportHTML';
import './Toolbar.css';
import PersistApiService from '../../services/persist-api-service';
import RemoteListChooser from '../RemoteListChooser/RemoteListChooser';
export default class Toolbar extends Component {
  static contextType = BookmarkContext;

  state = {
    renderListLoader: false,
  };

  saveList = () => {
    const { bookmarks, listName, listId } = this.context;
    PersistApiService.submitList(bookmarks, listName, listId).then(res => {
      this.context.setListId(res.id);
    });
  };

  loadList = () => {
    this.setState({ renderListLoader: true });
  };

  doneLoading = () => {
    this.setState({ renderListLoader: false });
  };

  // will get refactored into context
  exportHandler = () => {
    exportHTML(this.context.bookmarks);
  };

  render() {
    if (this.state.renderListLoader) {
      return (
        <div className="toolbar">
          <RemoteListChooser done={this.doneLoading} />
          <button className="btn cancel" onClick={this.doneLoading}>
            Cancel
          </button>
        </div>
      );
    } else {
      return (
        <div className="toolbar">
          <div className="btnBlock toolbarRow">
            <button className="btn" onClick={this.saveList}>
              Save
            </button>
            <button className="btn">Save as...</button>
            <button className="btn" onClick={this.loadList}>
              Load...
            </button>
            <button className="btn">Import...</button>
            <button className="btn" onClick={() => this.exportHandler()}>
              Export...
            </button>
            <select className="exportFormat" id="browserSelect">
              <option value="chrome">Chrome</option>
              <option value="firefox">Firefox</option>
              <option value='safari'>Safari</option>
            </select>
          </div>
          <form className="searchBlock">
            <input
              type="text"
              className="searchInput toolbarInput"
              name="search"
              placeholder="Type search..."
              onChange={e => this.props.updateSearch(e.target.value)}
            />
            <select className="toolbarInput" onChange={e => this.props.updateSearchFilter(e.target.value)}>
              <option value="any">Any</option>
              <option value="title">Name</option>
              <option value="url">URL</option>
              <option value="tag">Tag</option>
            </select>
          </form>
          <form className="filterBlock">
            <select className="toolbarInput" name="filter" id="filter" onChange={e => this.props.updateFilter(e.target.value)}>
              <option value="">No filter</option>
              <option value="bookmark">Only Bookmarks</option>
              <option value="folder">Only Folders</option>
            </select>
          </form>
        </div>
      );
    }
  }
}
