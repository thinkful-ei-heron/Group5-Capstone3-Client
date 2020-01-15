import React, { Component } from 'react'
import './Tree.css'
import uuid from 'uuid'

export default class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      uid: (!props.data.uid) ? uuid() : props.data.uid,
      sortByFunc: (props.sortByFunc)? props.sortByFunc: null,
      path: [...props.path, props.data.title],
      selected: false,
    }
  }


  static defaultProps = {
    // uid: null,
    parentId: null,
    data: null,
    path: [],
    level: null,
    onMount: () => { },
    generateTree: () => { }
  }

  toggleSelect = (e) => {
    e.preventDefault()
    this.setState({selected: !this.state.selected})
  }

  handleExpand = (e) => {
    this.setState({expanded: !this.state.expanded})
  }

  componentDidMount() {

    const { title, url, type, icon, contents } = this.props.data
    const { uid, expanded } = this.state
    const { parentId, level, order } = this.props

    this.props.onMount(uid, parentId, title, url, type, icon, level, order)
    // this.props.generateTree(this)
  }
  render() {
    const indent = this.props.level * 10
    let contents = this.props.data.contents

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

        {(this.props.data.type === 'folder') &&
          <button className="expand-button" onClick={this.handleExpand}>
            {this.state.expanded ? '-' : '+'}
          </button>
          // : <span>Type: {this.props.tree.type}</span>
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
                  onMount={this.props.onMount}
                  sortByFunc={this.props.sortByFunc}
                  generateTree={this.props.generateTree}
                />
              )
            }
        )}
      </div>
    )
  }
}
