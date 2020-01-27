import React, { Component } from "react";
import "./RemoteListChooser.css";
import PersistApiService from "../../services/persist-api-service";
import BookmarkContext from "../../contexts/BookmarkContext";

export default class RemoteListChooser extends Component {
  state = {
    lists: []
  };
  static contextType = BookmarkContext;

  componentDidMount() {
    this.getLists();
  }

  getLists() {
    PersistApiService.getLists().then(lists => {
      const names = {};
      lists.forEach(list => {
        let count = names[list.name];
        count = count ? count + 1 : 1;
        names[list.name] = count;
        if (count > 1) {
          list.name = `${list.name} (${count})`;
        }
      });
      this.setState({ lists });
    });
  }

  getList(id) {
    PersistApiService.getList(id).then(list => {
      this.context.setBookmarks(list);
      this.props.done();
    });
  }

  displayList(list) {
    return (
      <button
        className="btn list"
        onClick={() => this.getList(list.id)}
        key={list.id}
      >
        {list.name ? list.name : `List ${list.id}`}
      </button>
    );
  }

  render() {
    return <div>{this.state.lists.map(list => this.displayList(list))}</div>;
  }
}
