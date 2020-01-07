import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import SignupRoute from '../../routes/SignupRoute/SignupRoute';
import ViewRoute from '../../routes/ViewRoute/ViewRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <BrowserRouter>
          <main>
            <Route
              exact
              path={'/'}
              component={SignupRoute}
            />
            <Route
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              path={'/list'}
              component={ViewRoute}
            />
            <Route
              exact
              path={'/dashboard'}
              component={DashboardRoute}
            />
          </main>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
