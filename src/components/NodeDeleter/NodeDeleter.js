import React, { Component } from 'react';
import BookmarksContext from '../../contexts/BookmarkContext';

export class NodeDeleter extends Component {
  static contextType = BookmarksContext;

  handleDelete = () => {
    let confirmRemoveChildren = true; //default true for nodes with no children
    const node = this.props.node;
    if (node.contents && node.contents.length > 0) {
      confirmRemoveChildren = window.confirm(
        `This will delete the folder ${node.title} and all its contents!  Continue?`
      );
    }
    if (confirmRemoveChildren) {
      // parent.contents.splice(idx, 1); //in place update
      this.props.clearSelect();
      this.context.deleteNodeById(node.id);
    }
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleDelete} className="btn">
          Delete
        </button>
      </div>
    );
  }
}

export default NodeDeleter;
