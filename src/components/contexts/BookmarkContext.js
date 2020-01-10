import React from 'react'

const BookmarkContext = React.createContext()
export default BookmarkContext
export class BookmarkContextProvider extends React.Component {
	state = {
		bookmarks: null,
		error: null,
	}

	setBookmarks = (bm) => {
		this.setState({
			...this.state,
			bookmarks: bm,
		})
	}

	render() {
		const value = {
			bookmarks: this.state.bookmarks,
			error: this.state.error,
			setBookmarks: this.setBookmarks,

		}
		return (
			<BookmarkContext.Provider value={value}>
				{this.props.children}
			</BookmarkContext.Provider>
		)
	}
}
