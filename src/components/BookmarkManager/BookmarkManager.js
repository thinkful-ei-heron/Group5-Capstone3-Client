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

  handleSelect = (node, moving=this.state.moving) => {
    console.log(node)
    if (moving &&
      (node.state.data.type === 'folder' || node.state.data.contents)) {
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


  handleMoving = () => {
    if (this.state.selectedNodes.length) {
      this.setState({ moving: true })
    }
  }

  moveNodesToFolder = (moveNodes, newParentNode) => {
    this.setState({
      moving: false,
      moveToNode: null,
      selectedNodes: [],
    }, () => {
        let nodes = [...this.context.bookmarks]
        moveNodes.forEach(node => {
          node.setState({ selected: false })
          let parent = this.recursiveFind(node.state.parentId, nodes)
          if (parent) {
            let childIdx = parent.contents.findIndex(item => item.uid === node.state.uid)
            parent.contents.splice(childIdx, 1)

            let newParent = this.recursiveFind(newParentNode.state.uid, nodes)
            newParent.contents = [node.state.data, ...newParent.contents]
          } else {
            let idx = nodes.findIndex(item => item.uid === node.state.uid)
            nodes.splice(idx, 1)
            nodes = [node.state.data, ...nodes]
          }

        })
        this.context.setBookmarks(nodes)
    })
  }

  handleEdit() {
    const id = this.props.id;
    const nodes = [...this.context.bookmarks];
    const bm = this.recursiveFind(id, nodes);
    this.context.setBookmarks(nodes);
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
                  handleSelect={this.handleSelect}
                />
              )
            })}
        </div>
      </div>
    )
  }
}
