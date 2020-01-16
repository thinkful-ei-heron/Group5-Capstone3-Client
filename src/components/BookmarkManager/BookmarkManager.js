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
    flat: null,
    selectedNodes: [],
    moveToNode: null,
    moving: false,
  }



  hashedFlatBm = {}

  orderedTreeBm = []

  toggleSelect = (node) => {
    console.log(node)
    this.setState({ selectedNodes: this.state.selectedNodes.concat(node) })
  }

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

  handleMoving = () => {
    if (this.state.selectedNodes.length) {
      this.setState({moving: true})
    }
  }

  moveNodesToFolder = (nodes, newParentNode) => {
    let contents = []
    nodes.forEach(node => {
      contents.push(node.data)
    })
    newParentNode.setContents(contents)
    this.setState({
      moving: false,
      selected: [],
    })
  }


  registerNode = (node) => {
    if (node.uid === null || undefined) {
      node.state.uid = uuid()
    }
    this.hashedFlatBm[node.state.uid] = {
      node: node,
      uid: node.state.uid,
      parentId: node.state.parentId,
      data: node.state.data,
      path: node.state.path,
      selected: node.state.selected,
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
          {this.state.selectedNodes.length &&
            <button onClick={this.handleMoving}>Move To...</button>
          }
          {this.state.moving &&
            `Click a folder to move selected nodes`
          }

          {this.context.bookmarks &&
            this.context.bookmarks.map((bm, i) => {
              return (
                <Tree
                  key={i}
                  data={bm}
                  registerNode={this.registerNode}
                  generateTree={this.generateTree}
                  toggleSelect={this.toggleSelect}
                />
              )
            })}
        </div>
      </div>
    )
  }
}
