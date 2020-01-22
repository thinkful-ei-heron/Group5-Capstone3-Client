import React, { Component } from 'react';
import './Tree.css';
import BookmarkContext from '../../contexts/BookmarkContext';

export default class Tree extends Component {
  static contextType = BookmarkContext;
  constructor(props, context) {
    super(props, context);
    const id = props.data.id;
    this.state = {
      expanded: context.expandedNodes.has(id),
      selected: context.selectedNodes.has(id),
      parentId: props.parentId,
      data: props.data,
      id
    };
  }

  static defaultProps = {
    id: null,
    // parentId: null,
    data: null,
    path: [],
    level: null,
    order: null,
    // registerNode: () => { },
    // generateTree: () => { },
    handleSelect: () => {},
    sortByFunc: null
  };

  onDragStart = e => {
    this.props.handleOnDragStart(e, this);
  };

  handleExpand = e => {
    this.setState({ expanded: !this.state.expanded }, () => {
      if (this.state.expanded) {
        this.context.addExpandedNode(this.state.id);
      } else if (!this.state.expanded) {
        this.context.removeExpandedNode(this.state.id);
      }
    });
  };

  toggleSelect = () => {
    this.props.handleSelect(this);
    this.setState({ selected: !this.state.selected });
  };

  componentDidMount() {
    // this.props.registerNode(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // this.props.registerNode(this)
  }

  render() {
    let contents = this.props.data.contents;

    if (this.props.sortByFunc) {
      contents = this.props.sortByFunc(contents);
    }

    return (
      <div className="Tree" style={{ left: `${contents ? '28' : '46'}px` }}>
        <div className="itemRow">
          {contents && (
            <button className="expand-button" onClick={this.handleExpand}>
              {this.state.expanded ? '▼' : '►'}
            </button>
          )}

          <div
            className={`Tree-info ${this.state.selected && ` selected`}`}
            draggable
            onDragStart={this.onDragStart}
            onDragEnd={this.props.handleOnDragEnd}
            onClick={this.toggleSelect}
            onDrop={this.toggleSelect}
            onDragOver={e => {
              e.preventDefault();
            }}
          >
            {this.props.data.icon && (
              <img
                className="Tree-icon"
                src={this.props.data.icon}
                alt="icon"
              />
            )}

            <div className="Tree-detail">
              {/* <NodeManager node={this.props.data} /> */}
              {this.props.data.title && (
                <div className="Tree-title">
                  {this.props.data.contents ? (
                    <>
                      <span className="folderIcon">
                        <i
                          className={`far ${
                            this.state.expanded ? 'fa-folder-open' : 'fa-folder'
                          }`}
                        />
                      </span>{' '}
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
