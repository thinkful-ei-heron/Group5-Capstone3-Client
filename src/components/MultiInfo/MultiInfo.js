import React, { Component } from 'react'
import BookmarkContext from '../../contexts/BookmarkContext'

export default class MultiInfo extends Component {
  static contextType = BookmarkContext
  static defaultProps = {
    selectedNodes: [],
  }

  state = {
    multitags: {
      value: '',
      touched: false
    }
  }

  updateMultiTags(multitags) {
    this.setState({
      multitags: {
        value: multitags,
        touched: true
      }
    })
  }

  recursiveFind(id, nodes) {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.contents) {
        const foo = this.recursiveFind(id, node.contents);
        if (foo) return foo;
      }
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    let { multitags } = this.state;
    const nodes = [...this.context.bookmarks];
    if (multitags.value.length > 0) {
      multitags.value = multitags.value.split(',').map(tag => tag.trim());
      for (let node of this.props.selectedNodes) {
        const bm = this.recursiveFind(node.state.data.id, nodes);
        if (!bm) throw new Error('Could not find matching node');
        else {
          if (bm.tags === undefined) {
            bm.tags = multitags.value
          } else {
            bm.tags = bm.tags.concat(multitags.value)
          }
        }
      }
    }
    this.context.setBookmarks(nodes);
    this.props.clearSelect();
  }

  render() {
    return (
      <>
        <div className='right'>
          <button className='close' onClick={this.props.clearSelect} />
        </div>
        <h2>Apply Tags</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='multi-tags'>Add Tags: </label>
          <input
            type='text'
            className='infoInput'
            name='multi-tags'
            defaultValue=''
            onChange={e => this.updateMultiTags(e.target.value)}
          />
          <br />
          <input
            type='submit'
            value='Save'
            className='btn'
          />
        </form>
      </>
    );
  }
}