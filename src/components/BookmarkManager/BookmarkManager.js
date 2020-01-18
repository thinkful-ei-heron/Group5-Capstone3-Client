import React, { Component } from 'react'
import Tree from '../Tree/Tree'
import BookmarkContext from '../../contexts/BookmarkContext'
import ImportBookmarks from '../ImportBookmarks/ImportBookmarks'
import DragDrop from '../DragDrop/DragDrop'
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

  handleSelect = (node, moving = this.state.moving) => {
    //Check if selecting items or selecting folder to move items
    console.log(node)
    if (moving &&
      (node.props.data.type === 'folder' || node.props.data.contents)) {
      node.setState({selected: false})
      this.setState({ moveToNode: node }, () => {
        this.moveNodesToFolder(this.state.selectedNodes, this.state.moveToNode)
      })
    } else {
      if (this.state.selectedNodes.includes(node)) {
        let idx = this.state.selectedNodes.findIndex(item => item === node)
        this.state.selectedNodes.splice(idx, 1)
        this.setState({selectedNodes: this.state.selectedNodes})
      } else {
        this.setState({ selectedNodes: [...this.state.selectedNodes, node] })
      }
    }
  }

  // handleMoving = () => {
  //   if (this.state.selectedNodes.length) {
  //     this.setState({ moving: true })
  //   }
  // }

  moveNodesToFolder = (moveNodes, newParentNode) => {
    this.setState({
      moving: false,
      moveToNode: null,
      selectedNodes: [],
    }, () => {
        let nodes = [...this.context.bookmarks]
        moveNodes.forEach(node => {
          try {
            node.setState({ selected: false })
            let parent = this.recursiveFind(node.props.parentId, nodes)
            if (parent) {
              let childIdx = parent.contents.findIndex(item => item.uid === node.props.uid)
              parent.contents.splice(childIdx, 1)

              let newParent = this.recursiveFind(newParentNode.props.uid, nodes)
              newParent.contents = [node.props.data, ...newParent.contents]
            } else {
              let idx = nodes.findIndex(item => item.uid === node.props.uid)
              nodes.splice(idx, 1)
              nodes = [node.props.data, ...nodes]
            }
          } catch {
            this.setState({error: 'Invalid move'})
          }
        })
        this.context.setBookmarks(nodes)
    })
  }

  recursiveFind(uid, nodes) {
    for (const node of nodes) {
      if (node.uid === uid) {
        return node;
      }
      if (node.contents) {
        const foo = this.recursiveFind(uid, node.contents);
        if (foo) return foo;
      }
    }
  }

  onDragStart = (e) => {
    this.setState({moving: true})
  }

  // onDrop = (e) => {
  //   this.handleSelect(e.target)
  // }

  onDrag = (e) => {
    e.preventDefault()
  }

  onDragEnd = (e) => {
    this.setState({moving: false})
  }

  registerNode = (node) => {
    if (node.uid === null || undefined) {
      node.props.uid = uuid()
    }
    this.hashedFlatBm[node.state.uid] = {
      node: node,
      uid: node.props.uid,
      parentId: node.props.parentId,
      data: node.props.data,
      path: node.props.path,
      selected: node.state.selected,
    }
  }

  generateTree = (node, sourceObj = this.orderedTreeBm) => {
    //re-render tree object from flat
    if (!node.props.parentId && Array.isArray(sourceObj)) {
      sourceObj.push({
        uid: node.props.uid,
        parentId: node.props.parentId,
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
            <div
            draggable
            onDragStart={this.onDragStart}
            onDrag={this.onDrag}
            onDragEnd={this.onDragEnd}>
            <DragDrop
              selectedItems={this.state.selectedNodes}
              moving={this.state.moving}
            />
            </div>

          }
          {this.state.moving &&
            `Click a folder to move selected items`
          }

          {this.context.bookmarks &&
            this.context.bookmarks.map((bm, i) => {
              return (
                <Tree
                  uid={bm.uid}
                  key={bm.title}
                  data={bm}
                  // registerNode={this.registerNode}
                  generateTree={this.generateTree}
                  handleSelect={this.handleSelect}
                />
              )
            })}
        </div>
      </div>
    )
  }
}
