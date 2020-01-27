import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./App.css";

import LandingRoute from "../../routes/LandingRoute/LandingRoute";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import SignupRoute from "../../routes/SignupRoute/SignupRoute";
import ViewRoute from "../../routes/ViewRoute/ViewRoute";
import SettingsRoute from "../../routes/SettingsRoute/SettingsRoute";
import PublicOnlyRoute from "../../routes/PublicOnlyRoute/PublicOnlyRoute";
import PrivateOnlyRoute from "../../routes/PrivateOnlyRoute/PrivateOnlyRoute";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import Header from "../Header/Header";

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
        this.props.history.push("/");
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path={"/"} component={LandingRoute} />
            <Route path={"/list"} component={ViewRoute} />
            <PublicOnlyRoute path={"/login"} component={LoginRoute} />
            <PublicOnlyRoute path={"/signup"} component={SignupRoute} />
            <PrivateOnlyRoute path={"/settings"} component={SettingsRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
