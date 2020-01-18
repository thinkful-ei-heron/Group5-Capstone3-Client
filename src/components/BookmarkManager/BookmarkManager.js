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

  onDragStart = (e) => {
    this.setState({ moving: true })
  }

  onDrag = (e) => {
    e.preventDefault()
  }

  onDragEnd = (e) => {
    this.setState({ moving: false })
  }

  componentDidMount() {
    this.setState({ flat: this.hashedFlatBm })
  }

  handleSelect = (node, moving = this.state.moving) => {
    //Check if selecting items or selecting folder to move items
    if (moving) {
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

  moveNodesToFolder = (moveNodes, newTargetNode) => {
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

              if (!newTargetNode.props.data.type === 'bookmark') {
                let newParent = this.recursiveFind(newTargetNode.props.uid, nodes)
                newParent.contents = [node.props.data, ...newParent.contents]
              }
              else if (newTargetNode.props.data.type === 'bookmark') {
                let newParent = this.recursiveFind(newTargetNode.props.parentId, nodes)
                newParent.contents.splice(newTargetNode.props.order, 0, node.props.data)
              }
            } else {
              let idx = nodes.findIndex(item => item.uid === node.props.uid)
              nodes.splice(idx, 1)
              nodes = [node.props.data, ...nodes]
            }
          } catch(e) {
            this.setState({error: e})
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

  render() {
    return (
      <div className="BookmarkManager">
        <ImportBookmarks />

        <div className="BookmarkView">
          {this.state.selectedNodes.length > 0 &&
            <DragDrop
            onDragStart={this.onDragStart}
            onDrag={this.onDrag}
            onDragEnd={this.onDragEnd}
            selectedItems={this.state.selectedNodes}
            moving={this.state.moving}
            />
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
                  handleSelect={this.handleSelect}
                  order={i}
                  onDrop={this.onDrop}
                  onDragStart={this.onDragStart}
                  onDrag={this.onDrag}
                  onDragEnd={this.onDragEnd}
                />
              )
            })}
        </div>
      </div>
    )
  }
}
