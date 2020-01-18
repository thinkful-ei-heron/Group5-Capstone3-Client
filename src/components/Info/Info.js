import React, { Component } from 'react'
import BookmarkContext from '../../contexts/BookmarkContext'
import NodeManager from '../NodeManager/NodeManager';

import './Info.css';

export default class Info extends Component {
    static contextType = BookmarkContext
    state = {
        selectedNode: this.props.selectedNode,
        title: {
            value: this.props.selectedNode.title,
            touched: false
        },
        url: {
            value: this.props.selectedNode.url,
            touched: false
        },
        tags: {
            value: this.props.selectedNode.tags,
            touched: false
        }
    }

    // componentDidMount() {
    //     let data = {key: '5e222a5e8a656155dd30defc13bf436cfbb1b274b6ed2', q: this.state.url.value}
    //     if (this.state.url.value.length > 0){
    //         fetch('https://api.linkpreview.net', {
    //             method: 'POST',
    //             mode: 'cors',
    //             body: JSON.stringify(data),
    //         })
    //         .then(res => res.json())
    //         .then(response => {
    //             console.log(response)
    //             this.setState({thumbnail: response.image})
    //         })
    //     }
    // }

    updateTitle(title) {
        this.setState({title: {
            value: title,
            touched: true
        }})
    }

    updateURL(url) {
        this.setState({url: {
            value: url,
            touched: true
        }})
    }

    updateTags(tags) {
        this.setState({tags: {
            value: tags,
            touched: true
        }})
    }

    recursiveFind(uid, nodes) {
        for (const node of nodes) {
          if (node.uid === uid) {
            return node;
          }
          if (node.contents) {
            const foo = this.recursiveFind(uid, node.contents);
            if (foo) return foo;
          }
        }
      }
     

    handleSubmit = ev => {
        ev.preventDefault()
        let { title, url, tags } = this.state;
        if (tags.length > 0){
            tags.value = tags.value.split(',').map(tag => tag.trim());
        }
        const nodes = [...this.context.bookmarks];
        const bm = this.recursiveFind(this.state.selectedNode.uid, nodes);
        if (!bm) {
          throw new Error('Could not find matching node');
        }
        bm.title = title.value;
        bm.url = url.value;
        if (tags.length > 0){
            bm.tags = tags.value.split(', ')
        } else {
            bm.tags = [tags.value]
        }
        this.context.setBookmarks(nodes);
    }

    render() {
        return (
            <>
                <h2>Details</h2>
                <NodeManager clearSelect={this.props.clearSelect} node={this.props.selectedNode} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" defaultValue={this.state.selectedNode.title} onChange={e => this.updateTitle(e.target.value)}></input>
                    <br></br>
                    <div className={this.state.selectedNode.type === 'folder' ? 'hidden' : ''}>
                        <label htmlFor="url" >URL:</label>
                        <input type="text" name="url" defaultValue={this.state.selectedNode.url} onChange={e => this.updateURL(e.target.value)}></input>
                        <br></br>
                    </div>
                    <label htmlFor="tags">Tags:</label>
                    <input type="text" name="tags" defaultValue={this.state.selectedNode.tags} onChange={e => this.updateTags(e.target.value)}></input>
                    <br></br>
                    <input type='submit' value='Save' className='btn' />
                </form>
                <div className={this.state.selectedNode.type === 'folder' ? 'hidden' : ''}>
                    <img src={`https://image.thum.io/get/auth/7215-bookmarks/crop/600/${this.state.url.value}`} alt={`${this.state.title.value} preview`}/>
                </div>
                {/* <img src={this.state.thumbnail} alt={`${this.state.title.value} preview`} width='600' height='200'/> */}
            </>
        );
    }
}