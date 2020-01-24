import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
import TokenService from '../../services/token-service';

class App extends React.Component {
  state = {
    user: null,
    error: null
  };

  componentDidMount = () => {
    if (TokenService.hasAuthToken()) {
      let { exp } = TokenService.parseAuthToken();
      exp *= 1000; //s to ms;
      if (exp <= new Date()) {
        this.props.history.push('/');
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path={'/'} component={LandingRoute} />
          <Route path={'/list'} component={ViewRoute} />
          <PublicOnlyRoute path={'/login'} component={LoginRoute} />
          <PublicOnlyRoute path={'/signup'} component={SignupRoute} />
          <PrivateOnlyRoute path={'/dashboard'} component={DashboardRoute} />
          <Route component={NotFoundRoute} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
