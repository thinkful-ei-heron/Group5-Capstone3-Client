import React, { Component } from 'react'
import Tree from '../Tree/Tree'
import BookmarkContext from '../../contexts/BookmarkContext'
import ImportBookmarks from '../ImportBookmarks/ImportBookmarks'
import uuid from 'uuid'

export default class BookmarkManager extends Component {
  static contextType = BookmarkContext
  state = {
    error: null,
    levels: null,
    flat: {},
    selectedNodes: [],
    moveToNode: null,

  }



  hashedFlatBm = {}

  orderedTreeBm = []

  onDragStart = (node) => {
    this.setState({selectedNodes: node})
  }

  onDragEnd = (node) => {
    this.setState({moveToNode: node})
    //set contents of parent node to add selectedNodes
  }

  generateFlat = (uid, parentId, title, url, type, icon, level, order ) => {
    if (uid === null || undefined) {
      uid = uuid()
    }
    this.hashedFlatBm[uid] = {
      uid,
      parentId,
      title,
      url,
      type,
      icon,
    }
    this.generateTree(this.hashedFlatBm[uid], level, order)
  }

  generateTree(bookmark, level, order) {
    //re-render tree object from flat
    for (let i = 0; i < level; i++){

    }


  }

  componentDidMount() {
    this.setState({flat: this.hashedFlatBm})
  }

  render() {
    return (
      <div className="BookmarkManager">
        <ImportBookmarks />

        <div className="BookmarkView">
          {this.context.bookmarks &&
            this.context.bookmarks.map((bm, i) => {
              return (
                <div>
                  <Tree data={bm} onMount={this.generateFlat}/>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
