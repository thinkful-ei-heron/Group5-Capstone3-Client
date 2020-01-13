import React from 'react';
import BookmarkContext from '../../contexts/BookmarkContext';
import exportHTML from '../../helpers/exportHTML';
import './Toolbar.css';

export default class Toolbar extends React.Component {
  static contextType = BookmarkContext;

  updateSearch = () => {

  }

  updateFilter = () => {

  }

  // will get refactored into context
  exportHandler = () => {
    exportHTML(this.context.bookmarks)
  }

  render() {
    return (
      <div className='toolbar'>
        <div className='btnBlock toolbarRow'>
          <button className='btn'>Save</button>
          <button className='btn'>Save as...</button>
          <button className='btn'>Load...</button>
          <button className='btn'>Import...</button>
          <button className='btn' onClick={() => this.exportHandler()}>Export...</button>
          <select className='exportFormat'>
            <option value='chrome'>Chrome</option>
          </select>
        </div>
        <form className='searchBlock' onChange={this.updateSearch}>
          <input
            type='text'
            className='searchInput toolbarInput'
            name='search'
            placeholder='Type search...'
          />
          <select className='toolbarInput' onChange={this.updateSearch}>
            <option value='any'>Any</option>
            <option value='name'>Name</option>
            <option value='url'>URL</option>
            <option value='tag'>Tag</option>
          </select>
        </form>
        <form className='filterBlock' onChange={this.updateFilter}>
          <select className='toolbarInput' name='filter' id='filter'>
            <option value='none'>No filter</option>
            <option value='bookmarks'>Only Bookmarks</option>
            <option value='folders'>Only Folders</option>
          </select>
        </form>
      </div>
    );
  }
}
