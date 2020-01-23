import React, {Component} from 'react';
import './ViewRoute.css';
import BookmarkManager from '../../components/BookmarkManager/BookmarkManager'
import { BrowserRouter } from 'react-router-dom'

export default class ViewRoute extends Component {
  constructor(){
    super();
    this.state = {
      width: window.innerWidth
    }
  }

  componentWillMount() {
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
      console.log('isMobile');
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