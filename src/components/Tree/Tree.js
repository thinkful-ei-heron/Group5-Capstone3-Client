import React, { Component } from 'react';
import './Tree.css';

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
      selected: false,
      parentId: props.parentId,
      data: props.data,
      id: props.data.id
    }
  }

  static defaultProps = {
    id: null,
    parentId: null,
    data: null,
    path: [],
    level: null,
    order: null,
    registerNode: () => { },
    generateTree: () => { },
    handleSelect: () => { },
    sortByFunc: null,
  }

  componentDidMount() {
    this.props.registerNode(this)
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.registerNode(this)
  }

  handleExpand = e => {
    this.setState({ expanded: !this.state.expanded });
  };

  toggleSelect = () => {
    this.setState({ selected: !this.state.selected }, () => {
      this.props.handleSelect(this)
    })
  }

  render() {
    let contents = this.props.data.contents;

    if (this.props.sortByFunc) contents = this.props.sortByFunc(contents);

    return (
      <div
        className='Tree'
        style={{ left: `${contents ? '28' : '50'}px` }}
      >
        <div className='itemRow'>
        {contents &&
          <button className='expand-button' onClick={this.handleExpand}>
            {this.state.expanded ? '▼' : '►'}
          </button>
        }

        <div
          className={`Tree-info ${this.state.selected && 'selected'}`}
          draggable
          onDragStart={this.props.onDragStart}
          onDrag={this.props.onDrag}
          onDragEnd={this.props.onDragEnd}
          onClick={this.toggleSelect}
          onDrop={this.toggleSelect}
          onDragOver={(e) => { e.preventDefault() }}
        >
          {this.props.data.icon && <img className='Tree-icon' src={this.props.data.icon} alt='icon' />}

          <div className="Tree-detail">
            {/* <NodeManager node={this.props.data} /> */}
            {this.props.data.title && <span className='Tree-title'>
              {this.props.data.contents && <>
                <i class={`far ${this.state.expanded ? 'fa-folder-open' : 'fa-folder'}`} />
                {' '}
              </>}
              {this.props.data.title}
            </span>}
            {this.props.data.url && <span className='Tree-url'>{this.props.data.url}</span>}
          </div>
        </div>
        </div>

        {contents && this.state.expanded &&
          contents.map((data, i) => {
            return (
              <Tree
                id={data.id}
                parentId={this.props.data.id}
                key={data.id}
                data={data}
                level={this.props.level + 1}
                order={i}
                path={this.props.path}
                registerNode={this.props.registerNode}
                sortByFunc={this.props.sortByFunc}
                handleSelect={this.props.handleSelect}
                expanded={true}
                onDrop={this.props.onDrop}
                onDragStart={this.props.onDragStart}
                onDrag={this.props.onDrag}
                onDragEnd={this.props.onDragEnd}
              />
            )
          })
        }
        
      </div>
    );
  }
}
