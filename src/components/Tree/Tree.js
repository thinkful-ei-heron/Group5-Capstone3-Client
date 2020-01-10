import React, { Component } from 'react'
import './Tree.css'

export default class Tree extends Component {

  static defaultProps = {
    tree: null,
    level: null,
  }

  addChild() {

  }

  removeChild() {

  }
  render() {
    const indent = this.props.level * 10
    return (
      <div
        className="Tree"
        style={{
          position: "relative", left: `${indent}px`
        }}>



        <div className="Tree-info">
          {this.props.tree.icon &&
            <img className="Tree-icon" src={this.props.tree.icon} alt="icon"></img>}

          <div className="Tree-detail">
            {this.props.tree.title &&
              <span className="Tree-title">
                {this.props.tree.title}</span>}

            {this.props.tree.url &&
              <a className="Tree-url" href={this.props.tree.url}>
                {this.props.tree.url}</a>
            }
          </div>

        </div>


        {this.props.tree.last_modified &&
          <span className="Tree-modified">
            Last_modified: {this.props.tree.last_modified}</span>}



        {this.props.tree.type &&
          <span>Type: {this.props.tree.type}</span>}

        {this.props.tree.contents &&
          this.props.tree.contents.map(node =>
              <Tree tree={node} level={this.props.level + 1}></Tree>
          )}
      </div>
    )
  }
}
