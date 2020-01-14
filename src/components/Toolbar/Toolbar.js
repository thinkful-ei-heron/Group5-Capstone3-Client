import React, { Component } from 'react';
import BookmarkContext from '../../contexts/BookmarkContext';
import exportHTML from '../../helpers/exportHTML';
import './Toolbar.css';
import PersistApiService from '../../services/persist-api-service';
import RemoteListChooser from '../RemoteListChooser/RemoteListChooser';
export default class Toolbar extends Component {
  static contextType = BookmarkContext;

  state = {
    renderListLoader: false
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

  updateSearch = () => {};

  updateFilter = () => {};

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
            <select className="exportFormat">
              <option value="chrome">Chrome</option>
            </select>
          </div>
          <form className="searchBlock" onChange={this.updateSearch}>
            <input
              type="text"
              className="searchInput toolbarInput"
              name="search"
              placeholder="Type search..."
            />
            <select className="toolbarInput" onChange={this.updateSearch}>
              <option value="any">Any</option>
              <option value="name">Name</option>
              <option value="url">URL</option>
              <option value="tag">Tag</option>
            </select>
          </form>
          <form className="filterBlock" onChange={this.updateFilter}>
            <select className="toolbarInput" name="filter" id="filter">
              <option value="none">No filter</option>
              <option value="bookmarks">Only Bookmarks</option>
              <option value="folders">Only Folders</option>
            </select>
          </form>
        </div>
      );
    }
  }
}
