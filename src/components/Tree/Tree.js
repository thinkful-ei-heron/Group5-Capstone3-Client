import React, { Component } from 'react'
import './Tree.css'
import uuid from 'uuid'

export default class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      data: props.data,
      parentId: props.parentId,
      uid: (props.data.uid) ? props.data.uid : uuid(),
      sortByFunc: (props.sortByFunc)? props.sortByFunc: null,
      path: [...props.path, props.data.title],
      selected: false,
    }
  }

  static defaultProps = {
    parentId: null,
    data: null,
    path: [],
    level: null,
    registerNode: () => { },
    generateTree: () => { },
  }

  removeSelf = () => {

  }

  addContents = (contentsList) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        contents: this.state.contents.concat(contentsList)
      }
    })
  }

  setContents = (contentsList) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        contents: contentsList
      }
    })
  }

  toggleSelect = (e) => {
    e.preventDefault()
    this.setState({selected: !this.state.selected})
  }

  handleExpand = (e) => {
    this.setState({expanded: !this.state.expanded})
  }

  componentDidMount() {
    this.props.registerNode(this)
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.registerNode(this)
  }
  render() {
    let indent = this.props.level * 10
    let contents = this.state.data.contents

    if (this.state.sortBy) {
      contents = this.state.sortByFunc(contents)
    }

    return (
      <div
        className="Tree"
        style={{
          position: "relative", left: `${indent}px`
        }}>

        <div onClick={this.toggleSelect} className={`Tree-info ${this.state.selected && ` selected`}` }>
          {this.props.data.icon &&
            <img
              className="Tree-icon"
              src={this.props.data.icon}
              alt="icon"
            />
          }
          <div className="Tree-detail">
            {this.props.data.title &&
              <span className="Tree-title">
                {this.props.data.title}</span>
            }
            {this.props.data.url &&
              <a
                className="Tree-url"
                href={this.props.data.url}
                target="_blank"
              >
                {this.props.data.url}</a>
            }
          </div>
        </div>

        {/* {this.props.tree.last_modified &&
          <span className="Tree-modified">
            Last_modified: {this.props.tree.last_modified}</span>} */}

        {(this.props.data.type === 'folder' || this.props.data.contents) &&
          <button className="expand-button" onClick={this.handleExpand}>
            {this.state.expanded ? '-' : '+'}
          </button>
        }

        {contents &&
          this.state.expanded &&
            contents.map((data, i) => {
              return (
                <Tree
                  data={data}
                  level={this.props.level + 1}
                  order={i}
                  parentId={this.state.uid}
                  path={this.state.path}
                  registerNode={this.props.registerNode}
                  sortByFunc={this.props.sortByFunc}
                />
              )
            }
        )}
      </div>
    )
  }
}
