import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import SignupRoute from '../../routes/SignupRoute/SignupRoute';
import ViewRoute from '../../routes/ViewRoute/ViewRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

export default class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <main>
          <Switch>
            <Route
              exact
              path={'/'}
              component={ViewRoute}
            />
            <Route
              path={'/list'}
              component={ViewRoute}
            />
            <Route
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              path={'/signup'}
              component={SignupRoute}
            />
            <Route
              path={'/dashboard'}
              component={DashboardRoute}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
