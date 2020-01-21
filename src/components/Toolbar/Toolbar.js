import React, { Component } from 'react';
import BookmarkContext from '../../contexts/BookmarkContext';
import bmParser from '../../helpers/bookmarks-parser';
import './Toolbar.css';
import PersistApiService from '../../services/persist-api-service';
import RemoteListChooser from '../RemoteListChooser/RemoteListChooser';
import ImportBookmarks from '../ImportBookmarks/ImportBookmarks';
export default class Toolbar extends Component {
  static contextType = BookmarkContext;

  state = {
    renderListLoader: false,
    search: '',
    searchFilter: 'any',
    filter: '',
    renderUploader: false,
    renderExporter: false,
  };

  save = listId => {
    const { bookmarks, listName } = this.context;
    PersistApiService.submitList(bookmarks, listName, listId).then(res => {
      this.context.setListId(res.id);
    });
  };

  saveList = () => {
    this.save(this.context.listId);
  };

  saveCopy = () => {
    this.save(null);
  };

  loadList = () => {
    this.setState({ renderListLoader: true });
  };

  doneLoading = () => {
    this.setState({ renderListLoader: false });
  };

  // will get refactored into context
  // exportHandler = () => {
  //   exportHTML(this.context.bookmarks);
  // };

  updateSearchFilter = searchFilter => {
    this.setState({ searchFilter });
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  updateSearch = search => {
    this.setState({ search });
  };

  importFile = ev => {
    let reader = new FileReader();
    reader.onload = ev => {
      bmParser(reader.result, (err, res) => {
        if (err) {
          throw new Error(err);
        }
        return this.context.setBookmarks(res.bookmarks);
      });
    };
    try {
      reader.readAsText(ev.target.files[0]);
    } catch {
      this.setState({ error: 'No valid file' });
      return;
    }
  };

  doneImporting = () => {
    this.setState({ renderUploader: false });
  };

  exportFile = () => {
    this.setState({ renderExporter: true });
  };

  doneExporting = () => {
    this.setState({ renderExporter: false });
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
    } else if (this.state.renderExporter) {
      return (
        <div className="toolbar">
          <ImportBookmarks import={false} done={this.doneExporting} />
        </div>
      );
    } else {
      return (
        <div className="toolbar">
          <div className="btnBlock toolbarRow">
            <button className="btn" onClick={this.saveList}>
              Save
            </button>
            <button className="btn" onClick={this.saveCopy}>
              Copy to new list
            </button>
            <button className="btn" onClick={this.loadList}>
              Load...
            </button>
            <label className="btn inputfilelabel" htmlFor="bookmarkfile">Import...</label>
            <input 
              type="file" 
              className="btn inputfile" 
              name="bookmarkfile" 
              id="bookmarkfile" 
              onChange={this.importFile}>
            </input>
            <button className="btn" onClick={this.exportFile}>
              Export...
            </button>
          </div>
          <form className="filterBlock">
            <select
              className="selectInput"
              onChange={e => this.updateSearchFilter(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="title">Name</option>
              <option value="url">URL</option>
              <option value="tag">Tag</option>
            </select>
          </form>
          <form
            className="searchBlock"
            onSubmit={e =>
              this.props.updateFinalSearch(
                e,
                this.state.search,
                this.state.searchFilter,
                this.state.filter
              )
            }
          >
            <input
              type="text"
              className="searchInput"
              name="search"
              placeholder="Type search..."
              onChange={e => this.updateSearch(e.target.value)}
            />
            <input className="btn" type="submit" value="Search"></input>
          </form>

          <form className="filterBlock">
            <select
              className="selectInput"
              onChange={e => this.updateFilter(e.target.value)}
            >
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
