import React, { Component } from 'react'
import BookmarkContext from '../../contexts/BookmarkContext'

import Tree from '../../components/Tree/Tree'

export default class Search extends Component {
  state = {
    count: 0
  }

  static contextType = BookmarkContext

  hashedFlatBm = this.props.hashedFlatBm;
  arrHashedFlatBm = this.hashedFlatBm ? Object.values(this.hashedFlatBm) : [];

  orderedTreeBm = [];

  renderTree = bm => {
    return (
      <Tree
        id={bm.data.id}
        key={bm.data.id}
        data={bm.data}
        path={[bm.id]}
        parentId={bm.parentId}
        registerNode={this.props.registerNode}
        generateTree={this.props.generateTree}
        handleSelect={this.props.handleSelect}
        handleOnDragStart={this.props.handleOnDragStart}
        handleOnDragEnd={this.props.handleOnDragEnd}
        expanded={false}
      />
    )
  }

  render() {
    return (
      <>
        <h2>Search Results</h2>
        <div>
          {(this.arrHashedFlatBm && this.props.searchFilter === 'title') &&
            this.arrHashedFlatBm.filter(bm => !!bm.data.title && bm.data.title.toLowerCase().indexOf(this.props.search) !== -1).map(bm => {
              return this.renderTree(bm);
            })}
          {(this.arrHashedFlatBm && this.props.searchFilter === 'url') &&
            this.arrHashedFlatBm.filter(bm => (!!bm.data.url && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1)).map(bm => {
              return this.renderTree(bm);
            })}
          {(this.arrHashedFlatBm && this.props.searchFilter === 'tag') &&
            this.arrHashedFlatBm.filter(bm => (!!bm.data.tags && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1)).map(bm => {
              return this.renderTree(bm);
            })}
          {(this.arrHashedFlatBm && this.props.searchFilter === 'any') &&
            this.arrHashedFlatBm.filter(bm => ((!!bm.data.tags && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1) || (!!bm.data.url && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1)) || (!!bm.data.title && bm.data.title.toLowerCase().indexOf(this.props.search) !== -1)).map(bm => {
              return this.renderTree(bm);
            })}
        </div>
      </>
    )
  }
}