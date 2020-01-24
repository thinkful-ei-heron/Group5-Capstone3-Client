import React, {Component} from 'react';
import './ViewRoute.css';
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'
import { BrowserRouter } from 'react-router-dom'
import UserContext from '../../contexts/UserContext';

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
    this.setState({width: window.innerWidth})
  }

  render() {
    const {width} = this.state;
    const isMobile = width <= 700 
    if (isMobile) {
      return (
        <div className="ManagerView">
          <BrowserRouter>
            <BookmarkManager isMobile={isMobile}/>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div className="ManagerView">
          <BrowserRouter>
            <BookmarkManager isMobile={isMobile}/>
          </BrowserRouter>
        </div>
      );  
    } 
  }
}