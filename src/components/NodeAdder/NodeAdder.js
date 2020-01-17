import React, { Component } from 'react';
import uuid from 'uuid/v4';

export class NodeAdder extends Component {
  state = {
    title: '',
    type: 'folder',
    url: ''
  };

  handleSubmit = () => {
    const { title, type, url } = this.state;
    const id = uuid();
    const newNode = { id, title, type };
    if (type === 'folder') newNode.contents = [];
    if (type === 'bookmark') newNode.url = url;
    this.props.done(newNode);
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleUrlChange = event => {
    this.setState({ url: event.target.value });
  };

  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };
  render() {
    return (
      <div>
        <select value={this.state.type} onChange={this.handleTypeChange}>
          <option value="folder">Folder</option>
          <option value="bookmark">Bookmark</option>
        </select>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        {this.state.type === 'bookmark' && (
          <input
            type="text"
            value={this.state.url}
            onChange={this.handleUrlChange}
          />
        )}
        <button type="button" onClick={this.handleSubmit}>
          Save
        </button>
      </div>
    );
  }
}

export default NodeAdder;
