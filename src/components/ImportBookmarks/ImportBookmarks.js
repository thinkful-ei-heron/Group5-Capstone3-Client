import React, { Component } from 'react';
import bmParser from '../../helpers/bookmarks-parser';
import exportHTML from '../../helpers/exportHTML';
import BookmarkContext from '../../contexts/BookmarkContext';
import './ImportBookmarks.css';

export default class ImportBookmarks extends Component {
  static contextType = BookmarkContext;

  static defaultProps = {
    storeBookmarks: () => { },
    import: true
  };

  state = {
    imported: false,
    bookmarks: null
  };

  handleImport = e => {
    let reader = new FileReader();
    reader.onload = ev => {
      bmParser(reader.result, (err, res) => {
        if (err) throw new Error(err);

        return this.setState(
          {
            bookmarks: res.bookmarks,
            parser: res.parser,
            imported: true
          },
          () => {
            this.context.setBookmarks(res.bookmarks);
            this.props.done();
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

  // will get refactored into context (maybe?)
  exportHandler = () => {
    const browser = document.getElementById('browserSelect').value;
    exportHTML(this.context.bookmarks, browser);
    this.props.done();
  };

  cancelButton = () => {
    return (
      <input
        className='btn'
        type='button'
        value='Cancel'
        onClick={this.props.done}
      />
    );
  };

  render() {
    if (this.props.import) {
      return (
        <div className='Import'>
          {!this.state.imported &&
            <form id='importform' className='ImportForm'>
              <fieldset>
                <label htmlFor='bookmarkfile'>
                  Upload your bookmarks HTML file:
                </label>
                <input
                  type='file'
                  name='bookmarkfile'
                  id='bookmarkfile'
                  onChange={this.handleImport}
                />
              </fieldset>
              {this.cancelButton()}
            </form>
          }
        </div>
      );
    } else return (
      <div>
        <select className='btn' id='browserSelect'>
          <option value='chrome'>Chrome</option>
          <option value='firefox'>Firefox</option>
          <option value='safari'>Safari</option>
        </select>
        <button
          className='btn'
          onClick={() => this.exportHandler()}
        >
          Export...
          </button>
        {this.cancelButton()}
      </div>
    );
  }
}
