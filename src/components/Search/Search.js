import React, { Component } from 'react';
import Tree from '../../components/Tree/Tree';

export default class Search extends Component {
  render() {
    return (
      <>
        <h3>Search Results</h3>
        {this.props.results &&
          this.props.results.map(node => (
            <Tree
              id={node.id}
              key={node.id}
              data={node}
              handleSelect={this.props.handleSelect}
              expanded={false}
            />
          ))}
      </>
    );
  }
}
