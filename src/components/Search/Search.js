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

  componentDidUpdate() {
    // this.props.searchFilter==='any' && console.log('results count: ', this.arrHashedFlatBm.filter(bm => ( (!!bm.data.tags && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1) || (!!bm.data.url && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1) || (!!bm.data.title && bm.data.title.toLowerCase().indexOf(this.props.search) !== -1) )).length);

    // this.props.searchFilter==='any' && this.setState({count: (this.arrHashedFlatBm.filter(bm => ( (bm.data.tags !== undefined && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1) || (bm.data.url !== undefined && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1) || (bm.data.title.toLowerCase().indexOf(this.props.search) !== -1) )).length)});

    // this.props.searchFilter === 'tags' && console.log('results count: ', this.arrHashedFlatBm.filter(bm => !!bm.data.tags && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1).length)

    // this.props.searchFilter==='tags' && this.setState({count: this.arrHashedFlatBm.filter(bm => bm.data.tags !== undefined && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1).length});

    // (this.props.searchFilter === 'url' || this.props.searchFilter === 'title') && console.log('results count: ', this.arrHashedFlatBm.filter(bm => !!bm.data[this.props.searchFilter] && bm.data[this.props.searchFilter].toLowerCase().indexOf(this.props.search) !== -1).length);

    // (this.props.searchFilter==='url' || this.props.searchFilter==='title') && this.setState({count: this.arrHashedFlatBm.filter(bm => bm.data[this.props.searchFilter] !== undefined && bm.data[this.props.searchFilter].toLowerCase().indexOf(this.props.search) !== -1).length});
  }

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
        <h3>Search Results</h3>
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