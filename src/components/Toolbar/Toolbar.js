import React, { Component } from "react";
import PersistApiService from "../../services/persist-api-service";
import bmParser from "../../helpers/bookmarks-parser";
import BookmarkContext from "../../contexts/BookmarkContext";
import "./Toolbar.css";

import RemoteListChooser from "../RemoteListChooser/RemoteListChooser";
import ImportBookmarks from "../ImportBookmarks/ImportBookmarks";

export default class Toolbar extends Component {
  static contextType = BookmarkContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderListLoader: false,
      search: "",
      searchFilter: "any",
      filter: "",
      renderUploader: false,
      renderExporter: false,
      renderListNamer: false,
      nameError: null,
      listName: this.context.listName || ""
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
    } else this.save(this.context.listId);
  };

  saveAs = event => {
    event.preventDefault();
    this.context.setListName(this.state.listName);
    this.setState({ renderListNamer: false });
    this.save(null);
  };

  loadList = () => {
    this.setState({ renderListLoader: true });
    this.props.clearSelect();
  };

  deleteList = () => {
    const confirmDeleteList = window.confirm(
      'This will delete the currently loaded list and all its contents from the server permanently!  Continue?'
    );
    if (confirmDeleteList){
      PersistApiService.deleteList(this.context.listId);
      this.context.setListId(null);
      this.context.setListName(null);
      this.context.setBookmarks([]);
      this.props.clearSelect(); 
    }
  }

  doneLoading = () => {
    this.setState({
      renderListLoader: false,
      listName: this.context.listName || ""
    });
  };

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
    this.props.clearSelect();
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
      this.setState({ error: "No valid file" });
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
    if (this.state.renderListLoader)
      return (
        <div className="toolbar">
          <RemoteListChooser done={this.doneLoading} />
          <button className="btn btnPrimary cancel" onClick={this.doneLoading}>
            Cancel
          </button>
        </div>
      );

    if (this.state.renderExporter)
      return (
        <div className="toolbar">
          <ImportBookmarks
            import={false}
            done={this.doneExporting}
            clearSelect={this.props.clearSelect}
          />
        </div>
      );

    if (this.state.renderListNamer)
      return (
        <div className="toolbar">
          <form onSubmit={this.saveAs}>
            <input
              type="text"
              id="list-name-input"
              value={this.state.listName}
              onChange={this.handleNameChange}
            />
            <button
              type="submit"
              className="btn btnPrimary"
              disabled={!this.state.listName}
            >
              Save
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => this.setState({ renderListNamer: false })}
            >
              Cancel
            </button>
          </form>
        </div>
      );

    return (
      <div className="toolbar">
        <div className="btnBlock toolbarRow">
          {this.props.loggedIn && (
            <>
              <button className="btn btnPrimary" onClick={this.saveList}>
                Save
              </button>
              <button className="btn" onClick={this.beginSaveAs}>
                Save As
              </button>
              <button className="btn" onClick={this.loadList}>
                Load
              </button>
              <button className={this.context.listId === null ? "btn noHover" : "btn"} onClick={this.deleteList} disabled={this.context.listId === null}>
                Delete
              </button>
            </>
          )}
          <label
            className="btn inputFileLabel"
            htmlFor="bookmarkFile"
            tabIndex="0"
          >
            Import
          </label>
          <input
            type="file"
            className="inputFile"
            tabIndex="-1"
            name="bookmarkFile"
            id="bookmarkFile"
            onChange={this.importFile}
          />
          <button className="btn" onClick={this.exportFile}>
            Export
          </button>
        </div>

        <div className="searchRow">
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
            <label htmlFor="search" className="hiddenLabel" />
            <input
              type="text"
              className="searchInput"
              name="search"
              id="search"
              placeholder="Type search..."
              onChange={e => this.updateSearch(e.target.value)}
            />
            <label className="hiddenLabel" htmlFor="searchSubmit" />
            <input
              className="btn btnPrimary"
              id="searchSubmit"
              type="submit"
              value="Search"
            />
          </form>
          <form className="searchFilterBlock">
            <select
              className="selectInput btn"
              onChange={e => this.updateSearchFilter(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="title">Name</option>
              <option value="url">URL</option>
              <option value="tag">Tag</option>
            </select>
          </form>
        </div>

        <div className="filterRow mobileHiddenFilter">
          <form className="filterBlock">
            <select
              className="selectInput"
              onChange={e => this.props.updateFilter(e.target.value)}
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
