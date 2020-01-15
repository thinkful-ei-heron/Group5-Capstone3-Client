import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingRoute from '../../routes/LandingRoute/LandingRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import SignupRoute from '../../routes/SignupRoute/SignupRoute';
import ViewRoute from '../../routes/ViewRoute/ViewRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import PublicOnlyRoute from '../../routes/PublicOnlyRoute/PublicOnlyRoute';
import PrivateOnlyRoute from '../../routes/PrivateOnlyRoute/PrivateOnlyRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class App extends React.Component {
	state = {
		user: null,
		error: null
	}

	handleLoginSuccess = () => {
		const { location, history } = this.props
		const destination = (location.state || {}).from || '/'
		history.push(destination)
	}

	render() {
		return (
					<div className="App">
						<Header />
						<main>
							<Switch>
								<PublicOnlyRoute path={'/login'} component={LoginRoute}/>
								<PublicOnlyRoute path={'/signup'} component={SignupRoute}/>
								<PublicOnlyRoute exact path={'/'} component={LandingRoute}/>
								<PrivateOnlyRoute path={'/list'} component={ViewRoute}/>
								<PrivateOnlyRoute path={'/dashboard'} component={DashboardRoute}/>
								<Route component={NotFoundRoute}/>
							</Switch>
						</main>
						<Footer />
					</div>
		);
	}
}
