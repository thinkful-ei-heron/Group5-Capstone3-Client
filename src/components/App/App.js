import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import SignupRoute from '../../routes/SignupRoute/SignupRoute';
import ViewRoute from '../../routes/ViewRoute/ViewRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
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
