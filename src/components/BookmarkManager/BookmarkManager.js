import React, { Component } from 'react'
import Tree from '../Tree/Tree'
import BookmarkContext from '../../contexts/BookmarkContext'
import ImportBookmarks from '../ImportBookmarks/ImportBookmarks'
import Toolbar from '../Toolbar/Toolbar'
import Info from '../Info/Info'
import MultiInfo from '../MultiInfo/MultiInfo'
import Search from '../Search/Search'
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
    filter: '',
    searchFilter: 'any',
    search: '',
    finalSearch: ''
  }

  hashedFlatBm = {}

  orderedTreeBm = []

  updateSearchFilter = (searchFilter) => {
    this.setState({searchFilter})
  };

  updateFilter = (filter) => {
    this.setState({filter})
  };

  updateSearch = (search) => {
    this.setState({search})
  };

  clearSelect = () => {
    this.setState({selectedNodes: []})
  }

  handleSelect = (node, moving = this.state.moving) => {
    //Check if selecting items or selecting folder to move items
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
          try {
            node.setState({ selected: false })
            let parent = this.recursiveFind(node.props.parentId, nodes)
            if (parent) {
              let childIdx = parent.contents.findIndex(item => item.id === node.props.id)
              parent.contents.splice(childIdx, 1)

              let newParent = this.recursiveFind(newParentNode.props.id, nodes)
              newParent.contents = [node.props.data, ...newParent.contents]
            } else {
              let idx = nodes.findIndex(item => item.id === node.props.id)
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

  recursiveFind(id, nodes) {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.contents) {
        const foo = this.recursiveFind(id, node.contents);
        if (foo) return foo;
      }
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
    if (node.id === null || undefined) {
      node.props.id = uuid()
    }
    this.hashedFlatBm[node.state.id] = {
      node: node,
      id: node.props.id,
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
        id: node.props.id,
        parentId: node.props.parentId,
        title: node.props.data.title,
        contents: node.props.data.contents,
        type: node.props.data.type,
        add_date: node.props.data.add_date,
        last_modified: node.props.data.last_modified,
      })
    }
  }

  updateFinalSearch = ev => {
    ev.preventDefault();
    this.setState({finalSearch: this.state.search})
  }

  componentDidMount() {
    this.setState({flat: this.hashedFlatBm})
  }

  render() {
    const selectedNode = this.state.selectedNodes.length === 1 ? this.state.selectedNodes[0].state.data : null;
    return (
      <div className="BookmarkManager">
        <ImportBookmarks />
        {this.state.finalSearch !== '' && <Search flat={this.state.flat} search={this.state.finalSearch} searchFilter={this.state.searchFilter} hashedFlatBm={this.hashedFlatBm} registerNode={this.registerNode} generateTree={this.generateTree} handleSelect={this.handleSelect}/>}
        {selectedNode && <Info selectedNode={selectedNode} selectedNodes={this.state.selectedNodes}clearSelect={this.clearSelect}/>}
        {this.state.selectedNodes.length > 1 && <MultiInfo selectedNodes={this.state.selectedNodes}clearSelect={this.clearSelect}/>}

        <div className="BookmarkView">
          {this.state.selectedNodes.length > 0 &&
            <button onClick={this.handleMoving}>Move To...</button>
          }
          {this.state.moving &&
            `Click a folder to move selected items`
          }
          <Toolbar updateFinalSearch={this.updateFinalSearch} updateSearch={this.updateSearch} updateFilter={this.updateFilter} updateSearchFilter={this.updateSearchFilter}/>
          {this.context.bookmarks && (
            this.context.bookmarks.map((bm, i) => {
              if (this.state.filter !== '' && bm.type === this.state.filter){
                console.log('this.state.filter ===', this.state.filter)
                return (
                  <Tree
                    id={bm.id}
                    key={bm.title}
                    data={bm}
                    registerNode={this.registerNode}
                    generateTree={this.generateTree}
                    handleSelect={this.handleSelect}
                    expanded={true}
                  />
                )
              } else if(this.state.filter === ''){
                return (
                  <Tree
                    id={bm.id}
                    key={bm.title}
                    data={bm}
                    registerNode={this.registerNode}
                    generateTree={this.generateTree}
                    handleSelect={this.handleSelect}
                    expanded={true}
                  />
                )
              }
            })
          )}
        </div>
      </div>
    )
  }
}
