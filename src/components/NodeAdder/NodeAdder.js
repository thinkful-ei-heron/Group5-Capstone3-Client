import React, { Component } from "react";
import uuid from "uuid/v4";
import BookmarksContext from "../../contexts/BookmarkContext";
import "./NodeAdder.css";

export default class NodeAdder extends Component {
  static contextType = BookmarksContext;

  state = {
    title: "",
    type: "folder",
    url: "",
    tagString: ""
  };

  addChild = newNode => {
    const id = this.props.parent.id;
    const folder = this.context.findNodeById(id);
    const contents = folder.contents;
    if (!Array.isArray(contents)) {
      throw new Error("Attempted to add child node to a bookmark");
    }
    contents.push(newNode);
    this.context.updateNode(id, { contents });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { title, type, url } = this.state;
    const id = uuid();
    const newNode = { id, title, type };

    if (type === "folder") newNode.contents = [];
    if (type === "bookmark") newNode.url = url;
    if (this.state.tagString.length > 0) {
      const tags = this.state.tagString.split(", ");
      newNode.tags = tags;
    } else newNode.tags = "";

    this.addChild(newNode);
    this.props.toggleAdd();
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
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option value="folder">Folder</option>
            <option value="bookmark">Bookmark</option>
          </select>
          <br />
          <label htmlFor="title">Title:</label>
          <input
            className="infoInput"
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
            name="title"
          />
          <br />
          {this.state.type === "bookmark" && (
            <>
              <label htmlFor="url">URL:</label>
              <input
                className="infoInput"
                type="text"
                value={this.state.url}
                onChange={this.handleUrlChange}
                name="url"
              />
              <br />
            </>
          )}

          <label htmlFor="tags">Tags:</label>
          <input
            className="infoInput"
            type="text"
            value={this.state.tagString}
            placeholder="tag1, tag2, ..."
            onChange={this.handleTagChange}
            name="tags"
          />
          <br />
          <button type="submit" className="btn btnPrimary">
            Add
          </button>
        </fieldset>
      </form>
    );
  }
}
