import React from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import UserService from '../services/user-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setSettings: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {}
});

export default UserContext;

export class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    const state = { 
      user: {}, 
      error: null,
      settings: {}
  };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub
      };
    this.state = state;
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      let { exp } = TokenService.parseAuthToken();
      exp *= 1000; //s to ms
      if (exp > new Date()) {
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
        UserService.getUserSettings()
          .then(settings => this.setSettings(settings[0]))
          .then( () => {
            const root = document.documentElement;
            root.style.setProperty('--color-user', this.state.settings.color);
          })
      } else {
        this.processLogout(); //dead token, just log out to avoid trouble
      }
    }
  }

  componentWillUnmount() {
    TokenService.clearCallbackBeforeExpiry();
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = user => {
    this.setState({ user });
  };

  setSettings = settings => {
    this.setState({settings})
  }

  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub
    });
    UserService.getUserSettings()
      .then(settings => this.setSettings(settings[0]))
      .then( () => {
        const root = document.documentElement;
        root.style.setProperty('--color-user', this.state.settings.color);
      })
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    this.setUser({});
    this.setSettings({});
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    this.setUser({ idle: true });
  };

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch(err => {
        this.setError(err);
      });
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
