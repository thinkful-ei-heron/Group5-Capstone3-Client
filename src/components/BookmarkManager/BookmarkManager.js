import React, { Component } from 'react';
import uuid from 'uuid';
import BookmarkContext from '../../contexts/BookmarkContext';
import './BookmarkManager.css';

import Tree from '../Tree/Tree';
// import ImportBookmarks from '../ImportBookmarks/ImportBookmarks';
import DragDrop from '../DragDrop/DragDrop';
import Toolbar from '../Toolbar/Toolbar';
import Info from '../Info/Info';
import MultiInfo from '../MultiInfo/MultiInfo';
import Search from '../Search/Search';

export default class BookmarkManager extends Component {
  static contextType = BookmarkContext;
  state = {
    error: null,
    levels: null,
    flat: null,
    selectedNodes: this.context.selectedNodes,
    moveToNode: null,
    moving: false,
    filter: '',
    searchFilter: 'any',
    search: '',
    finalSearch: ''
  };

  hashedFlatBm = {};

  orderedTreeBm = [];

  handleOnDragStart = (e, node) => {
    if (!this.context.selectedNodes.includes(node)) {
      node.setState({ selected: true }, () => {
        this.context.setSelectedNodes([...this.context.selectedNodes, node])
        this.setState({ moving: true })
      })
    } else {
      this.setState({ moving: true })
    }
  }

  componentDidMount() {
    this.setState({ flat: this.hashedFlatBm });
    this.context.setFlat(this.hashedFlatBm)
  }

  handleOnDrag = e => {
    e.preventDefault();
  };

  handleExpand = (node) => {
    this.context.setExpandedNodes([...this.context.expandedNodes, node])
  }

  handleOnDragEnd = e => {
    this.setState({ moving: false });
  };

  updateSearchFilter = searchFilter => {
    this.setState({ searchFilter });
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  updateSearch = search => {
    this.setState({ search });
  };

  clearSelect = () => {
    this.context.setSelectedNodes([]);
  };

  handleSelect = (node, moving = this.state.moving) => {
    //Check if selecting items or selecting folder to move items
    if (moving) {
      node.setState({ selected: false });
      this.setState({ moveToNode: node }, () => {
        this.moveNodesToFolder(this.context.selectedNodes, this.state.moveToNode);
      });
    } else {
      if (this.context.selectedNodes.includes(node)) {
        let idx = this.context.selectedNodes.findIndex(item => item === node);
        this.context.selectedNodes.splice(idx, 1);
        this.context.setSelectedNodes(this.context.selectedNodes);
      } else {
        this.context.setSelectedNodes([...this.context.selectedNodes, node]);
      }
    }
  };

  moveNodesToFolder = (moveNodes, newTargetNode) => {
    this.context.setSelectedNodes([])
    this.setState(
      {
        moving: false,
        moveToNode: null,
      },
      () => {
        let nodes = [...this.context.bookmarks];
        moveNodes.forEach(node => {
          try {
            node.setState({ selected: false });
            if (newTargetNode.props.path.find(item => item === node.props.id) ||
              (node.props.id === newTargetNode.props.id)) {
              return
            }
            let parent = this.recursiveFind(node.props.parentId, nodes);
            if (parent) {
              let childIdx = parent.contents.findIndex(
                item => item.id === node.props.id
              );
              parent.contents.splice(childIdx, 1);

              if (
                newTargetNode.props.data.type === 'folder' ||
                newTargetNode.props.data.contents
              ) {
                let newParent = this.recursiveFind(
                  newTargetNode.props.id,
                  nodes
                );
                newParent.contents.splice(0, 0, node.props.data);
              } else if (newTargetNode.props.data.type === 'bookmark') {
                let newParent = this.recursiveFind(
                  newTargetNode.props.parentId,
                  nodes
                );
                newParent.contents.splice(
                  newTargetNode.props.order,
                  0,
                  node.props.data
                );
              }
            } else {
              let idx = nodes.findIndex(item => item.id === node.props.id);
              nodes.splice(idx, 1);
              nodes = [node.props.data, ...nodes];
            }
          } catch (e) {
            this.setState({ error: e });
          }
        });
        this.context.setBookmarks(nodes);
      }
    );
  };

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

  registerNode = node => {
    // if (node.id === null || undefined) {
    //   node.props.id = uuid();
    // }
    this.hashedFlatBm[node.props.id] = {
      node: node,
      id: node.props.id,
      parentId: node.props.parentId,
      data: node.props.data,
      path: node.props.path,
      selected: node.state.selected
    };
    if (this.context.flat[node.props.id]) {
      this.context.flat[node.props.id] = {
        node: node,
        id: node.props.id,
        parentId: node.props.parentId,
        data: node.props.data,
        path: node.props.path,
        selected: node.state.selected
      };
    }
  };

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
        last_modified: node.props.data.last_modified
      });
    }
  };

  updateFinalSearch = (ev, search, searchFilter, filter) => {
    ev.preventDefault();
    this.setState({
      search,
      searchFilter,
      filter
    });
  };

  render() {
    const selectedNode =
      this.context.selectedNodes.length === 1
        ? this.context.selectedNodes[0].state.data
        : null;
    return (
      <>
        <Toolbar updateFinalSearch={this.updateFinalSearch} />
        {/* <ImportBookmarks /> */}
        <div className="BookmarkManager">
          <div className="row">
            <div className="columnLeft BookmarkView">
              {this.context.selectedNodes.length > 0 && (
                <DragDrop
                  onDragStart={()=>{this.setState({moving:true})}}
                  onDrag={this.handleOnDrag}
                  onDragEnd={this.handleOnDragEnd}
                  selectedItems={this.context.selectedNodes}
                  moving={this.state.moving}
                  deselect={this.clearSelect}
                />
              )}
              {this.state.moving && `Click a folder to move selected items`}

              {this.context.bookmarks &&
                this.context.bookmarks.map((bm, i) => {
                  if (
                    this.state.filter !== '' &&
                    bm.type === this.state.filter
                  ) {
                    console.log('this.state.filter ===', this.state.filter);
                    return (
                      <Tree
                        id={bm.id}
                        key={bm.title}
                        data={bm}
                        handleSelect={this.handleSelect}
                        order={i}
                        path={['root', bm.id]}
                        expanded={true}
                        // expanded={this.context.expandedNodes.includes(bm.id)}
                        handleOnDragStart={this.handleOnDragStart}
                        handleOnDragEnd={this.handleOnDragEnd}
                        registerNode={this.registerNode}
                        generateTree={this.generateTree}
                      />
                    );
                  }
                  if (this.state.filter === '') {
                    return (
                      <Tree
                        id={bm.id}
                        key={bm.title}
                        data={bm}
                        handleSelect={this.handleSelect}
                        order={i}
                        path={['root', bm.id]}
                        expanded={true}
                        // expanded={this.context.expandedNodes.includes(bm.id)}
                        handleOnDragStart={this.handleOnDragStart}
                        handleOnDragEnd={this.handleOnDragEnd}
                        registerNode={this.registerNode}
                        generateTree={this.generateTree}
                      />
                    );
                  }
                })}

            </div>

            <div className="columnRight SearchInfoView">
              <div className="rowL2">
                  <div className='infoblock columnLeftL2'>
                    {selectedNode &&
                      <Info
                        selectedNode={selectedNode}
                        selectedNodes={this.context.selectedNodes}
                        clearSelect={this.clearSelect}
                      />}
                      {this.context.selectedNodes.length > 1 && (
                      <MultiInfo
                        selectedNodes={this.context.selectedNodes}
                        clearSelect={this.clearSelect}
                      />
                    )}
                  </div>

                  <div className='searchresults columnRightL2'>
                    {this.state.search !== '' && (
                      <Search
                        flat={this.context.flat}
                        search={this.state.search}
                        searchFilter={this.state.searchFilter}
                        // hashedFlatBm={this.hashedFlatBm}
                        registerNode={this.registerNode}
                        generateTree={this.generateTree}
                        handleSelect={this.handleSelect}
                        handleOnDragStart={this.handleOnDragStart}
                        handleOnDragEnd={this.handleOnDragEnd}
                      />
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}