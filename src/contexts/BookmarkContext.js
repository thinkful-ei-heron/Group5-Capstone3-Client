import React from 'react';

const BookmarkContext = React.createContext();
export default BookmarkContext;
export class BookmarkContextProvider extends React.Component {
  state = {
    bookmarks: null,
    error: null,
    selectedNodes: new Set(),
    expandedNodes: new Set(),
    listId: null,
    listName: null
  };

  setBookmarks = bm => {
    let bookmarks;
    if (Array.isArray(bm)) {
      bookmarks = bm;
    } else {
      bookmarks = bm.contents;
      this.setListId(bm.id);
      this.setListName(bm.name);
    }
    this.setState({ bookmarks });
  };

  addExpandedNode = id => {
    const { expandedNodes } = this.state;
    expandedNodes.add(id);
    this.setState({ expandedNodes });
  };
  removeExpandedNode = id => {
    const { expandedNodes } = this.state;
    expandedNodes.delete(id);
    this.setState({ expandedNodes });
  };
  removeAllExpandedNodes = () => {
    this.setState({ expandedNodes: new Set() });
  };

  addSelectedNode = id => {
    const { selectedNodes } = this.state;
    selectedNodes.add(id);
    this.setState({ selectedNodes });
  };
  removeSelectedNode = id => {
    const { selectedNodes } = this.state;
    selectedNodes.delete(id);
    this.setState({ selectedNodes });
  };
  removeAllSelectedNodes = () => {
    this.setState({ selectedNodes: new Set() });
  };

  setListId = listId => {
    this.setState({ listId });
  };

  setListName = listName => {
    this.setState({ listName });
  };

  updateNode = (id, updateInfo) => {
    const bookmarks = [...this.state.bookmarks];
    const node = this.findNodeById(id, bookmarks);
    if (!node) throw new Error('could not find matching node');
    for (const key of Object.keys(updateInfo)) {
      node[key] = updateInfo[key];
    }
    this.setState({ bookmarks });
  };

  getSelectedNodesArray = () => {
    const predicate = node => this.state.selectedNodes.has(node.id);
    return this.findNodesByPredicate(predicate);
  };

  findNodesByPredicate = predicate => {
    const nodes = [...this.state.bookmarks];
    return this._recursiveFilter(predicate, nodes);
  };

  _recursiveFilter(predicate, nodes) {
    const results = [];
    nodes.forEach(node => {
      if (predicate(node)) {
        results.push(node);
      }
      if (node.contents) {
        results.concat(this._recursiveFilter(predicate, node.contents));
      }
    });
    return results;
  }

  findNodeById = id => {
    const nodes = this.state.bookmarks;
    // console.log('find by id: ', id, ',', nodes);
    return this._recursiveFind(this._makeIdPredicate(id), nodes);
  };

  findParentNode = id => {
    const nodes = [...this.state.bookmarks];
    const root = { contents: nodes, id: -1 };
    return this._recursiveFind(this._makeParentPredicate, [root]);
  };

  checkParents = (nodes, target) => {
    const targetIdPredicate = this._makeIdPredicate(target.id);
    for (const node of nodes) {
      if (!node.contents) continue;
      if (this._recursiveFind(targetIdPredicate, node.contents)) return false;
    }
    return true;
  };

  deleteNodeById = id => {
    const nodes = [...this.state.bookmarks];
    const root = { contents: nodes };
    const parent = this._recursiveFind(this._makeParentPredicate(id), [root]);
    const idx = parent.contents.findIndex(node => node.id === id);
    parent.contents.splice(idx, 1);
    this.setState({ bookmarks: root.contents });
  };

  //given id, return predicate function that examines a node to see if node.id is equal to the provided id
  _makeIdPredicate = id => node => node.id === id;

  _makeParentPredicate = id => node =>
    node.contents && node.contents.some(node => node.id === id);

  _recursiveFind(predicate, nodes) {
    for (const node of nodes) {
      // console.log(node);
      if (predicate(node)) {
        return node;
      }
      if (node.contents) {
        const maybeResult = this._recursiveFind(predicate, node.contents);
        if (maybeResult) return maybeResult;
      }
    }
    return null;
  }

  render() {
    const value = {
      ...this.state,
      setBookmarks: this.setBookmarks,
      setListId: this.setListId,
      setListName: this.setListName,
      updateNode: this.updateNode,
      findNodeById: this.findNodeById,
      deleteNodeById: this.deleteNodeById,
      selectedNodes: this.state.selectedNodes,
      expandedNodes: this.state.expandedNodes,
      addExpandedNode: this.addExpandedNode,
      removeExpandedNode: this.removeExpandedNode,
      removeAllExpandedNodes: this.removeAllExpandedNodes,
      addSelectedNode: this.addSelectedNode,
      removeSelectedNode: this.removeSelectedNode,
      removeAllSelectedNodes: this.removeAllSelectedNodes,
      getSelectedNodesArray: this.getSelectedNodesArray,
      findParentNode: this.findParentNode,
      checkParents: this.checkParents
    };
    return (
      <BookmarkContext.Provider value={value}>
        {this.props.children}
      </BookmarkContext.Provider>
    );
  }
}
