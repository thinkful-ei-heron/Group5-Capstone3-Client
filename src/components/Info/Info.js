import React, { Component } from 'react'
import BookmarkContext from '../../contexts/BookmarkContext'
import NodeManager from '../NodeManager/NodeManager';
import Archive from '../Archive/Archive';

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
        },
        multitags: {
            value: '',
            touched: false
        }
    }

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

    updateMultiTags(multitags){
        this.setState({multitags: {
            value: multitags,
            touched: true
        }})

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
        let { title, url, tags, multitags } = this.state;
        if (tags.value.length > 0){
            tags.value = tags.value.split(',').map(tag => tag.trim());
        }
        const nodes = [...this.context.bookmarks];
        const bm = this.recursiveFind(this.state.selectedNode.id, nodes);
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

        if (multitags.value.length > 0){
            multitags.value = multitags.value.split(',').map(tag => tag.trim());
            for (let node of nodes) {
                node.tags = node.tags.concat(multitags.value)
            }
        }
        this.context.setBookmarks(nodes);
    }

    render() {
        return (
            <>
                <h3>Details</h3>
                {this.props.selectedNodes.length === 1 && <NodeManager clearSelect={this.props.clearSelect} node={this.props.selectedNode} />}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" defaultValue={this.state.selectedNode.title} onChange={e => this.updateTitle(e.target.value)}></input>
                    <br></br>
                    <div className={this.state.selectedNode.type === 'folder' ? 'hidden' : ''}>
                        <label htmlFor="url" >URL:</label>
                        <input type="text" name="url" defaultValue={this.state.selectedNode.url} onChange={e => this.updateURL(e.target.value)}></input>
                    </div>
                    <br></br>

                    <div className={this.state.selectedNode === null ? 'hidden' : ''}>
                        <label htmlFor="tags">Tags:</label>
                        <input type="text" name="tags" defaultValue={this.state.selectedNode.tags} onChange={e => this.updateTags(e.target.value)}></input>
                    </div>
                    <br></br>
                    <input type='submit' value='Save' className='btn' />
                </form>
                <div className={this.state.selectedNode.type === 'folder' ? 'hidden' : ''}>
                    {this.state.selectedNode.type === 'bookmark' && <img src={`https://image.thum.io/get/auth/7215-bookmarks/crop/200/${this.state.url.value}`} alt={`${this.state.title.value} preview`}/>}
                </div>
                {this.state.selectedNode.type ==='bookmark' && <Archive node={this.state.selectedNode} />}
            </>
        );
    }
}