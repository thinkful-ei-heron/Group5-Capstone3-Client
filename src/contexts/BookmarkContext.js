import React from 'react'

const BookmarkContext = React.createContext()
export default BookmarkContext
export class BookmarkContextProvider extends React.Component {
	state = {
		bookmarks: null,
		error: null,
		selected1: null,
		selected2: null,
	}

	setBookmarks = (bm) => {
		this.setState({
			bookmarks: bm
		})
	}

	render() {
		const value = {
			...this.state,
			setBookmarks: this.setBookmarks,
		}
		return (
			<BookmarkContext.Provider value={value}>
				{this.props.children}
			</BookmarkContext.Provider>
		)
	}
}
