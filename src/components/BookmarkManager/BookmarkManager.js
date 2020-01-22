import React, { Component } from 'react';
import uuid from 'uuid';
import BookmarkContext from '../../contexts/BookmarkContext';
import './BookmarkManager.css';

import Tree from '../Tree/Tree';
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
    finalSearch: '',
    results: []
  };

  search(search, searchFilter, filter) {
    const { bookmarks } = this.context;
    if (!bookmarks) return;
    // return;
    search = search.toLowerCase();
    console.log({ search, searchFilter, filter });
    const results = this.innerSearch(search, searchFilter, filter, [
      ...this.context.bookmarks
    ]);

    this.setState({ results });
  }

  innerSearch(term, field, type, nodes) {
    let results = [];
    const recurse = [];
    const keys = field === 'any' ? ['title', 'url', 'tags'] : [field];
    let filter;
    switch (type) {
      case 'bookmark':
        filter = node => !node.contents;
        break;
      case 'folder':
        filter = node => !node.contents;
        break;
      default:
        filter = _ => true;
    }
    nodes.forEach(node => {
      if (!filter(node)) return; //skip to next node
      // eslint does not detect node[key] as a use of key
      // eslint-disable-next-line no-unused-vars
      for (const key of keys) {
        // console.log(key);
        // console.log(node);
        if (key !== 'tags') {
          // node[key] && console.log(node[key].toLowerCase());
          if (node[key] && node[key].toLowerCase().includes(term)) {
            results.push(node);
            break; //don't push multiple times if multiple keys match
          }
        } else {
          if (key === 'tags') {
            if (
              node.tags &&
              node.tags.some(tag => tag.toLowerCase().includes(term))
            ) {
              results.push(node);
              break;
            }
          }
        }
      }
      if (node.contents && node.contents.length > 0) {
        recurse.push(node); //search entire folder before recursing
      }
    });
    recurse.forEach(node => {
      results = results.concat(
        this.innerSearch(term, field, type, node.contents)
      );
    });
    return results;
  }

  handleOnDragStart = (e, node) => {
    if (!this.context.selectedNodes.has(node)) {
      node.setState({ selected: true }, () => {
        this.context.addSelectedNode(node.id);
        this.setState({ moving: true });
      });
    } else {
      this.setState({ moving: true });
    }
  };

  componentDidMount() {
    this.setState({ flat: this.hashedFlatBm });
  }

  handleOnDrag = e => {
    e.preventDefault();
  };

  handleExpand = node => {
    this.context.setExpandedNodes([...this.context.expandedNodes, node]);
  };

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
    this.context.removeAllSelectedNodes();
  };

  handleSelect = (tree, moving = this.state.moving) => {
    const node = tree.props.data;
    //Check if selecting items or selecting folder to move items
    if (moving) {
      tree.setState({ selected: false });
      this.setState({ moveToNode: tree.props.data }, () => {
        this.moveNodesToFolder(
          this.context.getSelectedNodesArray(),
          this.state.moveToNode
        );
      });
    } else {
      if (this.context.selectedNodes.has(node.id)) {
        this.context.removeSelectedNode(node.id);
      } else {
        this.context.addSelectedNode(node.id);
      }
    }
  };

  moveNodesToFolder = (moveNodes, newTargetNode) => {
    this.context.removeAllSelectedNodes();
    this.setState(
      {
        moving: false,
        moveToNode: null
      },
      () => {
        const isFolder = !!newTargetNode.contents;
        const parent = isFolder
          ? newTargetNode
          : this.context.findParentNode(newTargetNode.id);
        if (!parent) {
          return;
        }
        let contents = parent.contents;
        const moveAcceptable = this.context.checkParents(
          moveNodes,
          newTargetNode
        );
        if (!moveAcceptable) {
          return;
        }
        //in case we are moving around within the same folder
        contents = contents.filter(
          node => !moveNodes.some(moveNode => moveNode.id === node.id)
        );
        //don't leave the old ones behind
        for (const node of moveNodes) {
          this.context.deleteNodeById(node.id);
        }
        const insertIdx = isFolder
          ? 0
          : contents.findIndex(node => node.id === newTargetNode.id) + 1;
        contents.splice(insertIdx, 0, ...moveNodes);

        if (parent.id === -1) {
          //root node constructed for FindParent
          this.context.setBookmarks(contents);
        } else {
          this.context.updateNode(parent.id, { contents });
        }
      }
    );
  };

  updateFinalSearch = (ev, search, searchFilter, filter) => {
    ev.preventDefault();
    this.setState({
      search,
      searchFilter,
      filter
    });
    this.search(search, searchFilter, filter);
  };

  render() {
    let selectedNode = null;
    if (this.context.selectedNodes.size === 1) {
      let selectedNodeId = this.context.selectedNodes.values().next().value;
      selectedNode = this.context.findNodeById(selectedNodeId);
    }
    return (
      <>
        <Toolbar updateFinalSearch={this.updateFinalSearch} />
        {/* <ImportBookmarks /> */}
        <div className="BookmarkManager">
          <div className="row">
            <div className="columnLeft BookmarkView">
              {this.context.selectedNodes.size > 0 && (
                <DragDrop
                  onDragStart={() => {
                    this.setState({ moving: true });
                  }}
                  onDrag={this.handleOnDrag}
                  onDragEnd={this.handleOnDragEnd}
                  selectedItems={this.context.getSelectedNodesArray()}
                  moving={this.state.moving}
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
                        path={[bm.id]}
                        expanded={this.context.expandedNodes.has(bm.id)}
                        handleOnDragStart={this.handleOnDragStart}
                        handleOnDragEnd={this.handleOnDragEnd}
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
                        path={[bm.id]}
                        expanded={this.context.expandedNodes.has(bm.id)}
                        handleOnDragStart={this.handleOnDragStart}
                        handleOnDragEnd={this.handleOnDragEnd}
                      />
                    );
                  }
                })}
            </div>

            <div className="columnRight SearchInfoView">
              {selectedNode && (
                <div className="infoblock">
                  <Info
                    selectedNode={selectedNode}
                    selectedNodes={this.context.selectedNodes}
                    clearSelect={this.clearSelect}
                  />
                </div>
              )}
              {this.context.selectedNodes.size > 1 && (
                <div className="infoblock">
                  <MultiInfo
                    selectedNodes={this.context.selectedNodes}
                    clearSelect={this.clearSelect}
                  />
                </div>
              )}
              {this.state.search !== '' && (
                <div className="searchresults">
                  <Search
                    results={this.state.results}
                    handleSelect={this.handleSelect}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
