import React, { Component } from "react";
import "./Tree.css";
import BookmarkContext from "../../contexts/BookmarkContext";

export default class Tree extends Component {
  static contextType = BookmarkContext;
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
      selected: false,
      parentId: props.parentId,
      data: props.data,
      id: props.data.id
    };
  }

  static defaultProps = {
    id: null,
    parentId: null,
    data: { id: null },
    path: [],
    level: null,
    order: null,
    expanded: true,
    selected: false,
    registerNode: () => {},
    generateTree: () => {},
    handleSelect: () => {},
    handleOnDragStart: () => {},
    handleOnDragEnd: () => {},
    sortByFunc: null
  };

  onDragStart = e => {
    this.props.handleOnDragStart(e, this);
  };

  handleExpand = e => {
    this.setState({ expanded: !this.state.expanded }, () => {
      if (
        this.state.expanded &&
        !this.context.expandedNodes.includes(this.props.id)
      ) {
        this.context.setExpandedNodes([
          ...this.context.expandedNodes,
          this.props.id
        ]);
      } else if (
        !this.state.expanded &&
        this.context.expandedNodes.includes(this.props.id)
      ) {
        let idx = this.context.expandedNodes.findIndex(
          item => item === this.props.id
        );
        this.context.expandedNodes.splice(idx, 1);
        this.context.setExpandedNodes(this.context.expandedNodes);
      }
    });
  };

  toggleSelect = () => {
    this.setState({ selected: !this.state.selected }, () => {
      this.props.handleSelect(this);
    });
  };

  componentDidMount() {
    this.props.registerNode(this);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.registerNode(this);
  }

  render() {
    let contents = this.props.data.contents;
    if (this.props.sortByFunc) {
      contents = this.props.sortByFunc(contents);
    }

    return (
      <div
        className="Tree"
        style={{
          left: `${
            contents ? (this.props.level === null ? "0" : "10") : "45"
          }px`
        }}
      >
        <div className="itemRow">
          {contents && (
            <button className="expand-button" onClick={this.handleExpand}>
              {this.state.expanded ? "▼" : "►"}
            </button>
          )}

          <div
            className={`Tree-info ${this.context.selectedNodes.includes(this) &&
              ` selected`}`}
            tabIndex="0"
            draggable
            onDragStart={this.onDragStart}
            onDragEnd={this.props.handleOnDragEnd}
            onClick={this.toggleSelect}
            onDrop={this.toggleSelect}
            onDragOver={e => {
              e.preventDefault();
            }}
          >
            {this.props.data.icon &&
              this.props.data.icon !== "undefined" &&
              this.props.data.type &&
              this.props.data.type !== "folder" && (
                <img
                  className="Tree-icon"
                  src={this.props.data.icon}
                  alt="icon"
                />
              )}

            <div className="Tree-detail">
              {this.props.data.title && (
                <div className="Tree-title">
                  {this.props.data.contents ? (
                    <>
                      <span className="folderIcon">
                        <i
                          className={`far ${
                            this.state.expanded ? "fa-folder-open" : "fa-folder"
                          }`}
                        />
                      </span>{" "}
                      <span className="folderText">
                        {this.props.data.title}
                      </span>
                    </>
                  ) : (
                    <>{this.props.data.title}</>
                  )}
                </div>
              )}
              {this.props.data.url && (
                <span className="Tree-url">{this.props.data.url}</span>
              )}
            </div>
          </div>
        </div>

        {contents &&
          this.state.expanded &&
          contents.map((data, i) => {
            return (
              <Tree
                id={data.id}
                parentId={this.props.data.id}
                key={data.id}
                data={data}
                level={this.props.level + 1}
                order={i}
                path={[...this.props.path, this.props.id]}
                expanded={true}
                registerNode={this.props.registerNode}
                sortByFunc={this.props.sortByFunc}
                handleSelect={this.props.handleSelect}
                handleOnDragStart={this.props.handleOnDragStart}
                handleOnDragEnd={this.props.handleOnDragEnd}
              />
            );
          })}
      </div>
    );
  }
}
