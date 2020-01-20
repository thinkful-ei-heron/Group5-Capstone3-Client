import React, { Component } from 'react';
import BookmarksContext from '../../contexts/BookmarkContext';

export class Search extends Component {
  static contextType = BookmarksContext;

  state = {
    results: []
  };

  search(type, term) {
    console.log(this.context.bookmarks);
    term = term.toLowerCase();
    const results = this.innerSearch(type, term, this.context.bookmarks);

    this.setState({ results });
  }

  innerSearch(type, term, nodes) {
    let results = [];
    const keys = type === 'any' ? ['title', 'url'] : [type];
    nodes.forEach(node => {
      // eslint does not detect node[key] as a use of key
      // eslint-disable-next-line no-unused-vars
      for (const key of keys) {
        console.log(node[key]);
        if (node[key] && node[key].toLowerCase().includes(term)) {
          console.log(node);
          results.push(node);
          break; //don't push multiple times if multiple keys match
        }
      }
      if (node.contents && node.contents.length > 0) {
        results = results.concat(this.innerSearch(type, term, node.contents));
      }
    });
    return results;
  }

  handleSearch(event) {
    event.preventDefault();
    const term = document.getElementById('searchbox').value;
    const type = document.getElementById('search-type').value;
    this.search(type, term);
  }

  searchBox() {
    return (
      <div>
        <form name="search" onSubmit={e => this.handleSearch(e)}>
          <select name="search-type" id="search-type">
            <option value="title">Title</option>
            <option value="url">URL</option>
            <option value="any">Everything</option>
          </select>
          <input type="text" name="searchbox" id="searchbox" />
          <button
            type="button"
            name="search-submit"
            onClick={event => this.handleSearch(event)}
          >
            Search
          </button>
        </form>
      </div>
    );
  }

  displayResult(result) {
    return (
      <div>
        <h3>{result.title}</h3>
        <p>{result.url}</p>
      </div>
    );
  }
  render() {
    if (!this.state.results.length) {
      return this.searchBox();
    } else {
      return (
        <>
          {this.searchBox()}
          <section className="results">
            ${this.state.results.map(this.displayResult)}
          </section>
        </>
      );
    }
  }
}

export default Search;
