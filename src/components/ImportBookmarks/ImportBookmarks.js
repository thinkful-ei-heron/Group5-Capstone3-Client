import React, { Component } from 'react';
import bmParser from '../../helpers/bookmarks-parser';
import exportHTML from '../../helpers/exportHTML';
import BookmarkContext from '../../contexts/BookmarkContext';
import './ImportBookmarks.css';

import Tree from '../Tree/Tree';

export default class ImportBookmarks extends Component {
  static contextType = BookmarkContext;

  static defaultProps = {
    storeBookmarks: () => {}
  };

  state = {
    imported: false,
    bookmarks: null
  };

  handleImport = e => {
    let reader = new FileReader();
    reader.onload = ev => {
      bmParser(reader.result, (err, res) => {
        if (err) {
          throw new Error(err);
        }
        return this.setState(
          {
            bookmarks: res.bookmarks,
            parser: res.parser,
            imported: true
          },
          () => {
            this.context.setBookmarks(res.bookmarks);
            console.log(this.state.bookmarks);
          }
        );
      });
    };
    try {
      reader.readAsText(e.target.files[0]);
    } catch {
      this.setState({ error: 'No valid file' });
      return;
    }
  };

  // will get refactored into context
  exportHandler = () => {
    const browser = document.getElementById('browserSelect').value;
    exportHTML(this.context.bookmarks, browser);
  };

  render() {
    return (
      <div className="Import">
        {!this.state.imported && (
          <form id="importform" className="ImportForm">
            <fieldset>
              <label htmlFor="bookmarkfile">
                Upload your bookmarks HTML file:
              </label>
              <input
                type="file"
                name="bookmarkfile"
                id="bookmarkfile"
                onChange={this.handleImport}
              />
            </fieldset>
          </form>
        )}
        <div>
          <button
            className="btn dashExport"
            onClick={() => this.exportHandler()}
          >
            Export...
          </button>
          <select className="exportFormat" id="browserSelect">
            <option value="chrome">Chrome</option>
            <option value="firefox">Firefox</option>
            <option value="safari">Safari</option>
          </select>
          {this.context.bookmarks &&
            this.context.bookmarks.map((bm, i) => {
              return (
                <div>
                  <Tree tree={bm} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
