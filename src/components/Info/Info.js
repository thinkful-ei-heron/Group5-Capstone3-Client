import React, { Component } from "react";
import BookmarkContext from "../../contexts/BookmarkContext";
import "./Info.css";

import NodeAdder from "../NodeAdder/NodeAdder";
import NodeDeleter from "../NodeDeleter/NodeDeleter";
import Archive from "../Archive/Archive";

export default class Info extends Component {
  static contextType = BookmarkContext;

  static defaultProps = {
    selectedNode: {
      title: null,
      url: null,
      tags: null
    }
  };

  state = {
    selectedNode: this.props.selectedNode,
    title: {
      value: this.props.selectedNode.title,
      touched: false
    },
    url: {
      value: this.props.selectedNode.url,
      touched: false
    },
    tags: {
      value: this.props.selectedNode.tags,
      touched: false
    },
    add: false
  };

  updateTitle(title) {
    this.setState({
      title: {
        value: title,
        touched: true
      }
    });
  }

  updateURL(url) {
    this.setState({
      url: {
        value: url,
        touched: true
      }
    });
  }

  updateTags(tags) {
    this.setState({
      tags: {
        value: tags,
        touched: true
      }
    });
  }

  toggleAdd = () => {
    this.setState({ add: !this.state.add });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    let { title, url, tags, selectedNode } = this.state;
    if (!!tags && typeof tags.value === "string") {
      tags.value = tags.value.split(",").map(tag => tag.trim());
    }
    title = title.value;
    url = url.value;

    if (tags.length > 0) tags = tags.value.split(", ");
    else tags = [tags.value];

    this.context.updateNode(selectedNode.id, { title, url, tags });
    this.props.clearSelect();
  };

  render() {
    return (
      <>
        <div className="right">
          <button className="close" onClick={this.props.clearSelect} />
        </div>
        {!!this.props.selectedNode &&
          this.props.selectedNode.type === "bookmark" && (
            <a
              className="bookmarkLink"
              href={this.props.selectedNode.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Bookmark
            </a>
          )}
        {!!this.props.selectedNode &&
          this.props.selectedNode.type !== "bookmark" && <h2>Edit Info</h2>}

        <form className="infoForm" onSubmit={this.handleSubmit}>
          <div className="infoRow">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              className="infoInput"
              defaultValue={this.state.selectedNode.title}
              onChange={e => this.updateTitle(e.target.value)}
            />
          </div>
          <div
            className={
              this.state.selectedNode.type === "folder" ? "hidden" : "infoRow"
            }
          >
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              name="url"
              className="infoInput"
              defaultValue={this.state.selectedNode.url}
              onChange={e => this.updateURL(e.target.value)}
            />
          </div>
          <div
            className={this.state.selectedNode === null ? "hidden" : "infoRow"}
          >
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              name="tags"
              className="infoInput"
              defaultValue={this.state.selectedNode.tags}
              onChange={e => this.updateTags(e.target.value)}
            />
          </div>

          <div className="infoBtnRow">
            <input
              type="submit"
              value="Save"
              className="btn btnPrimary infoSubmit"
            />

            {this.props.selectedNodes &&
              this.props.selectedNodes.length === 1 && (
                <NodeDeleter
                  clearSelect={this.props.clearSelect}
                  node={this.props.selectedNode}
                />
              )}
          </div>

          <div className={this.state.add ? "AddNodeForm add" : "AddNodeForm"}>
            {this.props.selectedNodes &&
              this.props.selectedNodes.length === 1 &&
              this.props.selectedNode.type !== "bookmark" && (
                <button type="button" onClick={this.toggleAdd} className="btn">
                  {this.state.add ? "Cancel" : "Add"}
                </button>
              )}
            {this.state.add && (
              <NodeAdder
                toggleAdd={this.toggleAdd}
                parent={this.props.selectedNode}
              />
            )}
          </div>
        </form>

        <div
          className={this.state.selectedNode.type === "folder" ? "hidden" : ""}
        >
          {this.state.selectedNode.type === "bookmark" &&
            !!this.props.settings && this.props.settings.preview && (
              <img
                className="thumbnail"
                src={`https://image.thum.io/get/auth/7215-bookmarks/crop/768/${this.state.url.value}`}
                alt={`${this.state.title.value} preview`}
              />
            )}
        </div>
        {this.state.selectedNode.type === "bookmark" && this.props.loggedIn && (
          <Archive node={this.state.selectedNode} />
        )}
      </>
    );
  }
}
