import React from "react";

const BookmarkContext = React.createContext();
export default BookmarkContext;
export class BookmarkContextProvider extends React.Component {
  state = {
    bookmarks: null,
    flat: null,
    error: null,
    selectedNodes: [],
    expandedNodes: [],
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
    this.setState({
      bookmarks
    });
  };

  setExpandedNodes = nodes => {
    this.setState({ expandedNodes: nodes });
  };

  setSelectedNodes = nodes => {
    this.setState({ selectedNodes: nodes });
  };

  setFlat = flat => {
    this.setState({ flat });
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
    if (!node) throw new Error("could not find matching node");
    for (const key of Object.keys(updateInfo)) {
      node[key] = updateInfo[key];
    }
    this.setState({ bookmarks });
  };

  findNodeById = id => {
    const nodes = this.state.bookmarks;
    return this._recursiveFind(this._makeIdPredicate(id), nodes);
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
      setFlat: this.setFlat,
      updateNode: this.updateNode,
      findNodeById: this.findNodeById,
      selectedNodes: this.state.selectedNodes,
      setSelectedNodes: this.setSelectedNodes,
      expandedNodes: this.state.expandedNodes,
      setExpandedNodes: this.setExpandedNodes,
      deleteNodeById: this.deleteNodeById
    };
    return (
      <BookmarkContext.Provider value={value}>
        {this.props.children}
      </BookmarkContext.Provider>
    );
  }
}
