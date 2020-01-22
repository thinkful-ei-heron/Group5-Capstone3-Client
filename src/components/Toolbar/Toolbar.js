import React, { Component } from 'react';
import BookmarkContext from '../../contexts/BookmarkContext';
import bmParser from '../../helpers/bookmarks-parser';
import './Toolbar.css';
import PersistApiService from '../../services/persist-api-service';
import RemoteListChooser from '../RemoteListChooser/RemoteListChooser';
import ImportBookmarks from '../ImportBookmarks/ImportBookmarks';
export default class Toolbar extends Component {
  static contextType = BookmarkContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      renderListLoader: false,
      search: '',
      searchFilter: 'any',
      filter: '',
      renderUploader: false,
      renderExporter: false,
      renderListNamer: false,
      nameError: null,
      listName: this.context.listName || ''
    };
  }


  save = listId => {
    const { bookmarks } = this.context;
    const { listName } = this.state;
    if (!listName) return;
    PersistApiService.submitList(bookmarks, listName, listId).then(res => {
      this.context.setListId(res.id);
    });
  };

  saveList = () => {
    if (!this.state.listName) {
      this.setState({ renderListNamer: true });
    } else {
      this.save(this.context.listId);
    }
  };

  saveAs = event => {
    event.preventDefault();
    this.context.setListName(this.state.listName);
    this.setState({ renderListNamer: false });
    this.save(null);
  };

  loadList = () => {
    this.setState({ renderListLoader: true });
  };

  doneLoading = () => {
    this.setState({
      renderListLoader: false,
      listName: this.context.listName || ''
    });
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

  beginSaveAs = () => {
    this.setState({ renderListNamer: true });
  };

  handleNameChange = event => {
    this.setState({ listName: event.target.value });
  };

  render() {
    if (this.state.renderListLoader) {
      return (
        <div className='toolbar'>
          <RemoteListChooser done={this.doneLoading} />
          <button className='btn cancel' onClick={this.doneLoading}>
            Cancel
          </button>
        </div>
      );
    } else if (this.state.renderExporter) {
      return (
        <div className='toolbar'>
          <ImportBookmarks import={false} done={this.doneExporting} />
        </div>
      );
    } else if (this.state.renderListNamer) {
      return (
        <div className='toolbar'>
          <form onSubmit={this.saveAs}>
            <input
              type='text'
              id='list-name-input'
              value={this.state.listName}
              onChange={this.handleNameChange}
            />
            <button type='submit' disabled={!this.state.listName}>
              Save
            </button>
            <button
              type='button'
              onClick={() => this.setState({ renderListNamer: false })}
            >
              Cancel
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className='toolbar'>
          <div className='btnBlock toolbarRow'>
            <button className='btn' onClick={this.saveList}>
              Save
            </button>
            <button className='btn' onClick={this.beginSaveAs}>
              Save as
            </button>
            <button className='btn' onClick={this.loadList}>
              Load...
            </button>
            <label
              className='btn inputFileLabel'
              htmlFor='bookmarkFile'
              tabIndex='0'
            >
              Import...
            </label>
            <input
              type='file'
              className='inputFile'
              tabIndex='-1'
              name='bookmarkFile'
              id='bookmarkFile'
              onChange={this.importFile}
            />
            <button className='btn' onClick={this.exportFile}>
              Export...
            </button>
          </div>
          <div className="searchRow">
            <form className="searchFilterBlock">
              <select
                className="btn selectInput"
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
          </div>
          <div className="filterRow mobileHiddenFilter">
            <form className="filterBlock">
              <select
                className="btn selectInput"
                onChange={e => this.updateFilter(e.target.value)}
              >
                <option value="">No filter</option>
                <option value="bookmark">Only Bookmarks</option>
                <option value="folder">Only Folders</option>
              </select>
            </form>
          </div>
        </div>
      );
    }
  }
}
