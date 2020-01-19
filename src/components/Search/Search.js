import React, { Component } from 'react'
import BookmarkContext from '../../contexts/BookmarkContext'
import Tree from '../../components/Tree/Tree'

export default class Search extends Component { 
  state = {
    count: 0
  } 
  static contextType = BookmarkContext

  hashedFlatBm = this.props.hashedFlatBm;
  arrHashedFlatBm = Object.values(this.hashedFlatBm);

  orderedTreeBm = [];

  // componentDidMount() {
  //   this.props.searchFilter==='any' && this.setState({count: this.arrHashedFlatBm.filter(bm => ( (bm.data.tags !== undefined && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1) || (bm.data.url !== undefined && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1) || (bm.data.title.toLowerCase().indexOf(this.props.search) !== -1) )).length});
  //   this.props.searchFilter==='tags' && this.setState({count: this.arrHashedFlatBm.filter(bm => bm.data.tags !== undefined && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1).length});
  //   (this.props.searchFilter==='url' || this.props.searchFilter==='title') && this.setState({count: this.arrHashedFlatBm.filter(bm => bm.data[this.props.searchFilter] !== undefined && bm.data[this.props.searchFilter].toLowerCase().indexOf(this.props.search) !== -1).length});
  // }

  render() {
    return (
      <>
        <p>Search Results</p>
        {(this.arrHashedFlatBm && this.props.searchFilter==='title') &&
          this.arrHashedFlatBm.filter(bm => bm.data.title.toLowerCase().indexOf(this.props.search) !== -1).map(bm => {
            console.log(bm);
            return (
              <Tree
                uid={bm.data.uid}
                key={bm.data.title}
                data={bm.data}
                registerNode={this.props.registerNode}
                generateTree={this.props.generateTree}
                handleSelect={this.props.handleSelect}
                expanded={false}
              />
            )
          })}
        {(this.arrHashedFlatBm && this.props.searchFilter==='url') &&
          this.arrHashedFlatBm.filter(bm => (bm.data.url !== undefined && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1)).map(bm => {
            console.log(bm);
            return (
              <Tree
                uid={bm.data.uid}
                key={bm.data.title}
                data={bm.data}
                registerNode={this.props.registerNode}
                generateTree={this.props.generateTree}
                handleSelect={this.props.handleSelect}
                expanded={false}
              />
            )
          })}
        {(this.arrHashedFlatBm && this.props.searchFilter==='tag') &&
          this.arrHashedFlatBm.filter(bm => (bm.data.tags !== undefined && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1)).map(bm => {
            console.log(bm);
            return (
              <Tree
                uid={bm.data.uid}
                key={bm.data.title}
                data={bm.data}
                registerNode={this.props.registerNode}
                generateTree={this.props.generateTree}
                handleSelect={this.props.handleSelect}
                expanded={false}
              />
            )
          })}
        {(this.arrHashedFlatBm && this.props.searchFilter==='any') &&
          this.arrHashedFlatBm.filter(bm => ( (bm.data.tags !== undefined && bm.data.tags.join(', ').toLowerCase().indexOf(this.props.search) !== -1) || (bm.data.url !== undefined && bm.data.url.toLowerCase().indexOf(this.props.search) !== -1)) || (bm.data.title.toLowerCase().indexOf(this.props.search) !== -1)).map(bm => {
            console.log(bm);
            return (
              <Tree
                uid={bm.data.uid}
                key={bm.data.title}
                data={bm.data}
                registerNode={this.props.registerNode}
                generateTree={this.props.generateTree}
                handleSelect={this.props.handleSelect}
                expanded={false}
              />
            )
          })}
      </>
    )
  }
}