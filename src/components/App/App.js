import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import LandingRoute from '../../routes/LandingRoute/LandingRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import SignupRoute from '../../routes/SignupRoute/SignupRoute';
import ViewRoute from '../../routes/ViewRoute/ViewRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {BookmarkContextProvider} from '../../contexts/BookmarkContext'

export default class App extends React.Component {
  state = {

  }

  render() {
    return (
			<BookmarkContextProvider>
				<div className="App">
					<Header />
					<main>
						<Switch>
							<Route
								exact
								path={'/'}
								component={LandingRoute}
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
			</BookmarkContextProvider>
    );
  }
}
