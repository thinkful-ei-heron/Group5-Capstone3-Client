import React, { Component } from "react";
import "./DragDrop.css";

export default class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.selectedItems,
      moving: props.moving,
      isMobile: props.isMobile,
      fade: true
    };
  }

  static defaultProps = {
    moving: false,
    selectedItems: null,
    isMobile: false
  };

  mousePos = { x: null, y: null };

  handleMoveStart = e => {
    this.setState({
      moving: true,
      fade: false
    });
  };

  handleMoving = (e, node) => {
    if (this.state.moving) {
      this.mousePos = {
        x: e.clientX,
        y: e.clientY
      };
    }
  };

  render() {
    return (
      <div
        draggable
        tabIndex="0"
        onDragStart={this.props.onDragStart}
        onDrag={this.props.onDrag}
        onDragEnd={this.props.onDragEnd}
        className="DragDrop"
        style={{
          position: this.props.moving ? "fixed" : "fixed",
          zIndex: this.props.moving ? "1" : "2",
          opacity: this.props.moving ? 20 : 70,
          right: "200px",
          bottom: "10px"
        }}
      >
        <div className="top">
          Selected Bookmarks:
          <button onClick={this.props.deselect} className="deselect">
            x
          </button>
        </div>
        <div className="selected-list">
          <ul>
            {this.props.selectedItems &&
              this.props.selectedItems.map(item => {
                return <li key={item.props.id}>{item.props.data.title}</li>;
              })}
          </ul>
        </div>
      </div>
    );
  }
}
