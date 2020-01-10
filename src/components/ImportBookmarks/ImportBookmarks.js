import React, { Component } from 'react'
import './ImportBookmarks.css'
import bmParser from '../../helpers/bookmarks-parser'
import BookmarkContext from '../contexts/BookmarkContext'


export default class ImportBookmarks extends Component {

	static contextType = BookmarkContext

  static defaultProps = {
    storeBookmarks: () => { }
  }

  state = {
    imported: false,
    bookmarks: null,
  }

  handleImport = (e) => {
    let reader = new FileReader()
    reader.onload = (ev) => {
      bmParser(reader.result, (err, res) => {
        if (err) {
          throw new Error(err)
        }
        return this.setState({
          bookmarks: res,
          imported: true,
				}, ()=>{
					this.context.setBookmarks(res)
				})
      })
    }
    try {
      reader.readAsText(e.target.files[0])
    } catch {
      this.setState({ error: 'No valid file' })
      return
    }
  }

  render() {
    return (
      <div className="Import">
        <form id="importform" className="ImportForm">
          <fieldset>
            Upload your bookmarks HTML file
            <label htmlFor="bookmarkfile">Bookmark File</label>
            <input type="file" name="bookmarkfile" id="bookmarkfile" onChange={this.handleImport} />

          </fieldset>
        </form>
				<div>
					{this.context.bookmarks}
				</div>
      </div>
    )
  }
}
