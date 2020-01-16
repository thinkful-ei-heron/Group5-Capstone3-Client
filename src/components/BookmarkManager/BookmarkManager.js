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

  findBm(path, sourceObj = this.context.bookmarks) {
    if (path.length === 1) {
      return sourceObj.find(item => item.uid === path[0])
    }
    if (Array.isArray(sourceObj)) {
      let nextIdx = sourceObj.indexOf(item => item.uid === path[0])
      path = path.slice(1, -1)
      this.findBm(path, sourceObj.contents[nextIdx])
    }
  }

  onDragStart = (node) => {
    this.setState({selectedNodes: node})
  }

  onDragEnd = (node) => {
    this.setState({moveToNode: node})
    //set contents of parent node to add selectedNodes
  }


  generateFlat = (node) => {
    if (node.uid === null || undefined) {
      node.state.uid = uuid()
    }
    this.hashedFlatBm[node.state.uid] = {
      node: node,
      uid: node.state.uid,
      parentId: node.state.parentId,
      data: node.state.data,
      path: node.state.path,
    }
  }

  generateTree = (node, sourceObj = this.orderedTreeBm) => {
    //re-render tree object from flat
    if (!node.props.parentId && Array.isArray(sourceObj)) {
      sourceObj.push({
        uid: node.state.uid,
        parentId: node.state.parentId,
        title: node.props.data.title,
        contents: node.props.data.contents,
        type: node.props.data.type,
        add_date: node.props.data.add_date,
        last_modified: node.props.data.last_modified,
      })
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
                  <Tree data={bm} registerNode={this.generateFlat} generateTree={this.generateTree}/>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
