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

  findBm(sourceObj = this.context.bookmarks, path) {
    if (path.length === 1) {
      return sourceObj.find(item => item.title === path[0])
    }
    if (Array.isArray(sourceObj)) {
      let nextIdx = sourceObj.indexOf(item => item.title === path[0])
      path = path.slice(1, -1)
      this.findBm(sourceObj.contents[nextIdx])
    }
  }

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
  }

  generateTree = (node, sourceObj = this.orderedTreeBm) => {
    //re-render tree object from flat
    if (!node.props.parentId && Array.isArray(sourceObj)) {
      sourceObj.push({...node})
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
                  <Tree data={bm} onMount={this.generateFlat} generateTree={this.generateTree}/>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
