import React, { Component } from 'react'
import './Tree.css'

export default class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      selected: false,
      parentId: props.parentId,
      data: props.data,
      uid: props.data.uid
    }
  }

  static defaultProps = {
    uid: null,
    parentId: null,
    data: null,
    path: [],
    level: null,
    order: null,
    registerNode: () => { },
    generateTree: () => { },
    toggleSelect: () => { },
    sortByFunc: () => { },
  }

  handleExpand = (e) => {
    this.setState({expanded: !this.state.expanded})
  }

  toggleSelect = () => {
    this.setState({ selected: !this.state.selected }, () => {
      this.props.handleSelect(this)
    })
  }

  componentDidMount() {
    this.props.registerNode(this)
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.registerNode(this)
  }

  render() {
    let indent = this.props.level * 10
    let contents = this.props.data.contents

    if (this.props.sortBy) {
      contents = this.props.sortByFunc(contents)
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
                  uid={data.uid}
                  parentId={this.props.data.uid}
                  key={data.uid}
                  data={data}
                  level={this.props.level + 1}
                  order={i}
                  path={this.props.path}
                  registerNode={this.props.registerNode}
                  sortByFunc={this.props.sortByFunc}
                  handleSelect={this.props.handleSelect}
                />
              )
            }
        )}
      </div>
    )
  }
}
