import React from 'react';

const BookmarkContext = React.createContext();
export default BookmarkContext;
export class BookmarkContextProvider extends React.Component {
  state = {
		bookmarks: null,
		flat: null,
    error: null,
    selected1: null,
    selected2: null,
    listId: null,
    listName: null
  };

  setBookmarks = bm => {
    let bookmarks;
    if (Array.isArray(bm)) {
      bookmarks = bm;
    } else {
      bookmarks = bm.contents;
      this.setListId(bm.id);
      this.setListName(bm.name);
    }
    this.setState({
      bookmarks
    });
	};

	setFlat = flat => {
		this.setState({ flat });
	};

  setListId = listId => {
    this.setState({ listId });
  };

  setListName = listName => {
    this.setState({ listName });
  };

  render() {
    const value = {
      ...this.state,
      setBookmarks: this.setBookmarks,
      setListId: this.setListId,
			setListName: this.setListName,
			setFlat: this.setFlat,
    };
    return (
      <BookmarkContext.Provider value={value}>
        {this.props.children}
      </BookmarkContext.Provider>
    );
  }
}
