import React, { Component } from 'react';
import Tree from '../Tree/Tree';
import BookmarkContext from '../../contexts/BookmarkContext';
import ImportBookmarks from '../ImportBookmarks/ImportBookmarks';
import DragDrop from '../DragDrop/DragDrop';
import Toolbar from '../Toolbar/Toolbar';
import Info from '../Info/Info';
import MultiInfo from '../MultiInfo/MultiInfo';
import Search from '../Search/Search';
import uuid from 'uuid';
import './BookmarkManager.css';

export default class BookmarkManager extends Component {
  static contextType = BookmarkContext;
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
  };

  hashedFlatBm = {};

  orderedTreeBm = [];

  onDragStart = e => {
    this.setState({ moving: true });
  };

  onDrag = e => {
    e.preventDefault();
  };

  onDragEnd = e => {
    this.setState({ moving: false });
  };

  componentDidMount() {
    this.setState({ flat: this.hashedFlatBm });
  }

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
    this.setState({ selectedNodes: [] });
  };

  handleSelect = (node, moving = this.state.moving) => {
    //Check if selecting items or selecting folder to move items
    if (moving) {
      node.setState({ selected: false });
      this.setState({ moveToNode: node }, () => {
        this.moveNodesToFolder(this.state.selectedNodes, this.state.moveToNode);
      });
    } else {
      if (this.state.selectedNodes.includes(node)) {
        let idx = this.state.selectedNodes.findIndex(item => item === node);
        this.state.selectedNodes.splice(idx, 1);
        this.setState({ selectedNodes: this.state.selectedNodes });
      } else {
        this.setState({ selectedNodes: [...this.state.selectedNodes, node] });
      }
    }
  };

  moveNodesToFolder = (moveNodes, newTargetNode) => {
    this.setState(
      {
        moving: false,
        moveToNode: null,
        selectedNodes: []
      },
      () => {
        let nodes = [...this.context.bookmarks];
        moveNodes.forEach(node => {
          try {
            node.setState({ selected: false });
            if (newTargetNode.props.path.includes(node.props.id)) {
              throw new Error('invalid');
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
      selected: node.state.selected
    };
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

  updateFinalSearch = (ev, search, searchFilter, filter)=> {
    ev.preventDefault();
    this.setState({
      search,
      searchFilter,
      filter
    })
  }

  render() {
    const selectedNode =
      this.state.selectedNodes.length === 1
        ? this.state.selectedNodes[0].state.data
        : null;
    return (
      <>
        <Toolbar
          updateFinalSearch={this.updateFinalSearch}
        />
        <div className="BookmarkManager">
          <div className="row">
            <div className="columnLeft BookmarkView">
              {this.state.selectedNodes.length > 0 && (
                <DragDrop
                  onDragStart={this.onDragStart}
                  onDrag={this.onDrag}
                  onDragEnd={this.onDragEnd}
                  selectedItems={this.state.selectedNodes}
                  moving={this.state.moving}
                />
              )}
              {this.state.moving && `Click a folder to move selected items`}

              {this.context.bookmarks && this.context.bookmarks.map((bm, i) => {
                if (this.state.filter !== '' && bm.type === this.state.filter) {
                  console.log('this.state.filter ===', this.state.filter);
                  return (
                    <Tree
                      id={bm.id}
                      key={bm.title}
                      data={bm}
                      handleSelect={this.handleSelect}
                      order={i}
                      path={[bm.id]}
                      onDrop={this.handleSelect}
                      onDragStart={this.onDragStart}
                      onDrag={this.onDrag}
                      onDragEnd={this.onDragEnd}
                      registerNode={this.registerNode}
                      generateTree={this.generateTree}
                      expanded={true}
                    />
                  );
                } else if (this.state.filter === '') {
                  return (
                    <Tree
                      id={bm.id}
                      key={bm.title}
                      data={bm}
                      handleSelect={this.handleSelect}
                      order={i}
                      path={[bm.id]}
                      onDrop={this.handleSelect}
                      onDragStart={this.onDragStart}
                      onDrag={this.onDrag}
                      onDragEnd={this.onDragEnd}
                      registerNode={this.registerNode}
                      generateTree={this.generateTree}
                      expanded={true}
                    />
                  );
                }
              })}
            </div>

            <div className="columnRight SearchInfoView">
              {selectedNode && (
                <Info
                  selectedNode={selectedNode}
                  selectedNodes={this.state.selectedNodes}
                  clearSelect={this.clearSelect}
                />
              )}
              {this.state.selectedNodes.length > 1 && (
                <MultiInfo
                  selectedNodes={this.state.selectedNodes}
                  clearSelect={this.clearSelect}
                />
              )}
              {this.state.search !== '' && (
                <Search
                  flat={this.state.flat}
                  search={this.state.search}
                  searchFilter={this.state.searchFilter}
                  hashedFlatBm={this.hashedFlatBm}
                  registerNode={this.registerNode}
                  generateTree={this.generateTree}
                  handleSelect={this.handleSelect}
                />
              )}

            </div>
          </div>
        </div>
      </>
    );
  }
}
