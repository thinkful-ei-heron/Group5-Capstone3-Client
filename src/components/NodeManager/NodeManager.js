import React, { Component } from 'react';
import BookmarksContext from '../../contexts/BookmarkContext';
import NodeAdder from '../NodeAdder/NodeAdder';

export class NodeManager extends Component {
  static contextType = BookmarksContext;

  constructor(props) {
    super(props);
    this.state = {
      add: false
    };
  }
  addChild = newNode => {
    const id = this.props.node.id;
    const folder = this.context.findNodeById(id);
    const contents = folder.contents;
    if (!Array.isArray(contents)) {
      throw new Error('Attempted to add child node to a bookmark');
    }
    contents.push(newNode);
    this.context.updateNode(id, { contents });
    this.toggleAdd();
  };

  toggleAdd = () => {
    this.setState({ add: !this.state.add });
  };

  handleDelete = () => {
    let confirmRemoveChildren = true; //default true for nodes with no children
    const node = this.props.node;
    if (node.contents && node.contents.length > 0) {
      confirmRemoveChildren = window.confirm(
        `This will delete ${node.title} and all contents!  Continue?`
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
        {/* <button type="button" onClick={this.toggleEdit}>
              Edit
            </button> */}
        <button type="button" onClick={this.handleDelete} className="btn">
          Delete
        </button>

        {/* <form onSubmit={this.handleAddTag}>
              <input type="text" name="tags"></input>
              <button>Add Tags</button>
            </form> */}

        { this.props.node &&
          this.props.node.contents &&
          !this.state.add && (
          <button type="button" onClick={this.toggleAdd} className="btn">
            +
          </button>
        )}
        {this.state.add && (
          <NodeAdder
            parent={this.props.node}
            done={newNode => {
              this.addChild(newNode);
            }}
          />
        )}
      </div>
    );
  }
}

export default NodeManager;
