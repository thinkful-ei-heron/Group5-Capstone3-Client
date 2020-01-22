import React, { Component } from 'react';
import uuid from 'uuid/v4';

export class NodeAdder extends Component {
  state = {
    title: '',
    type: 'folder',
    url: '',
    tagString: ''
  };

  handleSubmit = () => {
    const { title, type, url } = this.state;
    const id = uuid();
    const newNode = { id, title, type };
    if (type === 'folder') newNode.contents = [];
    if (type === 'bookmark') newNode.url = url;
    if (this.state.tagString.length > 0) {
      const tags = this.state.tagString.split(', ');
      newNode.tags = tags;
    }

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

  handleTagChange = event => {
    this.setState({ tagString: event.target.value });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-form">
        <fieldset>
          <legend>Add</legend>
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option value="folder">Folder</option>
            <option value="bookmark">Bookmark</option>
          </select>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
            name="title"
          />
          {this.state.type === 'bookmark' && (
            <>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                value={this.state.url}
                onChange={this.handleUrlChange}
                name="url"
              />
            </>
          )}
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            value={this.state.tagString}
            placeholder="tag1, tag2, ..."
            onChange={this.handleTagChange}
            name="tags"
          />
          <button type="submit" className="btn">
            Save
          </button>
        </fieldset>
      </form>
    );
  }
}

export default NodeAdder;
