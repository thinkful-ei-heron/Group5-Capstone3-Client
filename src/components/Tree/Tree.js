import React, { Component } from 'react'
import './Tree.css'
import uuid from 'uuid'

export default class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      uid: (!props.data.uid) ? uuid() : props.data.uid,
      sortByFunc: null,

    }
  }


  static defaultProps = {
    // uid: null,
    parentId: null,
    data: null,
    level: null,
    onMount: () => { }
  }



  addChild() {

  }

  removeChild() {

  }

  handleExpand = (e) => {
    this.setState({expanded: !this.state.expanded})
  }

  componentDidMount() {

    const { title, url, type, icon, contents } = this.props.data
    const { uid, expanded } = this.state
    const { parentId, level, order } = this.props

    this.props.onMount(uid, parentId, title, url, type, icon, level, order)
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

        <div className="Tree-info">
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
                  onMount={this.props.onMount}
                />
              )
            }
        )}
      </div>
    )
  }
}
