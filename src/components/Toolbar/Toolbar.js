import React from 'react';
import './Toolbar.css';

export default class Toolbar extends React.Component {
  updateSearch = () => {

  }

  updateFilter = () => {

  }

  render() {
    return (
      <div className='toolbar'>
        <div className='btnBlock toolbarRow'>
          <button className='btn'>Save</button>
          <button className='btn'>Save as...</button>
          <button className='btn'>Load...</button>
          <button className='btn'>Import...</button>
          <button className='btn'>Export...</button>
        </div>
        <form className='searchBlock' onChange={this.updateSearch}>
          <input
            type='text'
            name='search'
            placeholder='Type search...'
          />
          <select onChange={this.updateSearch}>
            <option value='any'>Any</option>
            <option value='name'>Name</option>
            <option value='url'>URL</option>
            <option value='tag'>Tag</option>
          </select>
        </form>
        <form className='filterBlock' onChange={this.updateFilter}>
          <select name='filter' id='filter'>
            <option value='none'>No filter</option>
            <option value='bookmarks'>Only Bookmarks</option>
            <option value='folders'>Only Folders</option>
          </select>
        </form>
      </div>
    );
  }
}
