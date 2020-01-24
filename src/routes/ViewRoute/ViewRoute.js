import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import './ViewRoute.css';

import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'

export default class ViewRoute extends Component {
  static contextType = UserContext;

  state = {
    width: window.innerWidth,
    settings: this.context.settings
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 700

    return (
      <div className="ManagerView">
        <BookmarkManager isMobile={isMobile} />
      </div>
    )
  }
}